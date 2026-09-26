import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * OrbitScene — the site's 3D centerpiece.
 *
 * A tilted particle accretion disk orbiting a wireframe icosahedral
 * core: inner particles run hot (ember) and fast, outer ones cool and
 * slow, all computed on the GPU from orbital elements so the CPU does
 * nothing per frame. Two precessing rings and a soft core glow finish
 * the composition.
 *
 * Interaction:
 *  - drag anywhere to spin the whole system, with inertia
 *  - pointer parallax on the camera, scroll dolly + fade for legibility
 *  - prefers-reduced-motion renders a single static, composed frame
 *  - rendering pauses when the tab is hidden; everything disposes
 */
export default function OrbitScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
    } catch {
      return // WebGL unavailable — graceful near-black fallback
    }

    const isMobile = window.innerWidth < 768
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.75 : 2)
    renderer.setPixelRatio(dpr)
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      140,
    )
    camera.position.set(0, 0.4, 12.6)

    /* ————————————————— shared sprite shaders ————————————————— */

    const diskVert = /* glsl */ `
      attribute float aRadius;
      attribute float aTheta;
      attribute float aSpeed;
      attribute float aY;
      attribute float aSize;
      attribute float aPhase;
      attribute float aMix;
      uniform float uTime;
      uniform float uPixelRatio;
      varying float vMix;
      varying float vTwinkle;

      void main() {
        float theta = aTheta + uTime * aSpeed;
        vec3 p = vec3(cos(theta) * aRadius, aY, sin(theta) * aRadius);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vTwinkle = 0.78 + 0.22 * sin(uTime * 1.5 + aPhase);
        vMix = aMix;
        gl_PointSize = aSize * uPixelRatio * (215.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `

    const diskFrag = /* glsl */ `
      uniform float uOpacity;
      varying float vMix;
      varying float vTwinkle;

      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv) * 2.0;
        float a = smoothstep(1.0, 0.3, d);
        a *= a;
        vec3 cool = vec3(0.82, 0.83, 0.9);
        vec3 ember = vec3(1.0, 0.44, 0.2);
        vec3 col = mix(cool, ember, vMix);
        gl_FragColor = vec4(col, a * vTwinkle * uOpacity * 0.62);
      }
    `

    const dustVert = /* glsl */ `
      attribute float aSize;
      attribute float aPhase;
      attribute float aSpeed;
      uniform float uTime;
      uniform float uPixelRatio;
      varying float vTwinkle;

      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vTwinkle = 0.5 + 0.5 * sin(uTime * aSpeed + aPhase);
        gl_PointSize = aSize * uPixelRatio * (210.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `

    const dustFrag = /* glsl */ `
      uniform float uOpacity;
      varying float vTwinkle;

      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv) * 2.0;
        float a = smoothstep(1.0, 0.1, d);
        a *= a;
        gl_FragColor = vec4(vec3(0.88, 0.89, 0.94), a * (0.25 + 0.55 * vTwinkle) * uOpacity);
      }
    `

    /* ————————————————— accretion disk ————————————————— */

    const DISK_COUNT = isMobile ? 4200 : 8500
    const dRadius = new Float32Array(DISK_COUNT)
    const dTheta = new Float32Array(DISK_COUNT)
    const dSpeed = new Float32Array(DISK_COUNT)
    const dY = new Float32Array(DISK_COUNT)
    const dSize = new Float32Array(DISK_COUNT)
    const dPhase = new Float32Array(DISK_COUNT)
    const dMix = new Float32Array(DISK_COUNT)

    const R_IN = 2.35
    const R_OUT = 8.4

    for (let i = 0; i < DISK_COUNT; i++) {
      const r = R_IN + Math.pow(Math.random(), 1.55) * (R_OUT - R_IN)
      dRadius[i] = r
      dTheta[i] = Math.random() * Math.PI * 2
      // Keplerian flavour: inner orbit visibly faster
      dSpeed[i] = 0.5 / Math.pow(r, 1.5)
      const flare = 0.035 + (r - R_IN) * 0.016
      dY[i] = (Math.random() + Math.random() + Math.random() - 1.5) * flare
      dSize[i] = (0.32 + Math.random() * 0.85) * (r < 3.3 ? 1.1 : 1)
      dPhase[i] = Math.random() * Math.PI * 2
      const heat = Math.max(0, 1 - (r - R_IN) / 1.7)
      dMix[i] = Math.min(1, heat * (0.5 + Math.random() * 0.6))
    }

    const diskGeo = new THREE.BufferGeometry()
    diskGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(DISK_COUNT * 3), 3))
    diskGeo.setAttribute('aRadius', new THREE.BufferAttribute(dRadius, 1))
    diskGeo.setAttribute('aTheta', new THREE.BufferAttribute(dTheta, 1))
    diskGeo.setAttribute('aSpeed', new THREE.BufferAttribute(dSpeed, 1))
    diskGeo.setAttribute('aY', new THREE.BufferAttribute(dY, 1))
    diskGeo.setAttribute('aSize', new THREE.BufferAttribute(dSize, 1))
    diskGeo.setAttribute('aPhase', new THREE.BufferAttribute(dPhase, 1))
    diskGeo.setAttribute('aMix', new THREE.BufferAttribute(dMix, 1))

    const diskMat = new THREE.ShaderMaterial({
      vertexShader: diskVert,
      fragmentShader: diskFrag,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: dpr },
        uOpacity: { value: reduced ? 1 : 0 },
      },
    })
    const disk = new THREE.Points(diskGeo, diskMat)

    /* ————————————————— icosahedral core ————————————————— */

    const core = new THREE.Group()

    const innerGeo = new THREE.IcosahedronGeometry(1.5, 1)
    const innerWire = new THREE.LineSegments(
      new THREE.WireframeGeometry(innerGeo),
      new THREE.LineBasicMaterial({ color: 0xf4f2ec, transparent: true, opacity: 0.15 }),
    )
    core.add(innerWire)

    const outerGeo = new THREE.IcosahedronGeometry(1.95, 0)
    const outerWire = new THREE.LineSegments(
      new THREE.WireframeGeometry(outerGeo),
      new THREE.LineBasicMaterial({ color: 0xf4f2ec, transparent: true, opacity: 0.05 }),
    )
    core.add(outerWire)

    const nodeGeoDetail = new THREE.IcosahedronGeometry(1.5, 2)
    const nodeAttr = nodeGeoDetail.getAttribute('position')
    const nodeCount = nodeAttr.count
    const nodeArr = new Float32Array(nodeCount * 3)
    for (let i = 0; i < nodeCount; i++) {
      nodeArr[i * 3] = nodeAttr.getX(i)
      nodeArr[i * 3 + 1] = nodeAttr.getY(i)
      nodeArr[i * 3 + 2] = nodeAttr.getZ(i)
    }
    const nodeGeo = new THREE.BufferGeometry()
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodeArr, 3))
    const nodeMat = new THREE.PointsMaterial({
      color: 0xf4f2ec,
      size: 0.028,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    core.add(new THREE.Points(nodeGeo, nodeMat))

    /* — core glow: one soft additive sprite, canvas radial gradient — */
    const glowCanvas = document.createElement('canvas')
    glowCanvas.width = glowCanvas.height = 128
    const gctx = glowCanvas.getContext('2d')!
    const grad = gctx.createRadialGradient(64, 64, 0, 64, 64, 64)
    grad.addColorStop(0, 'rgba(255, 235, 220, 0.85)')
    grad.addColorStop(0.25, 'rgba(255, 140, 70, 0.38)')
    grad.addColorStop(0.6, 'rgba(255, 110, 50, 0.1)')
    grad.addColorStop(1, 'rgba(255, 110, 50, 0)')
    gctx.fillStyle = grad
    gctx.fillRect(0, 0, 128, 128)
    const glowTex = new THREE.CanvasTexture(glowCanvas)
    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0.9,
      }),
    )
    glow.scale.setScalar(2.1)
    core.add(glow)

    /* ————————————————— orbital rings ————————————————— */

    const ringGeoA = new THREE.TorusGeometry(3.15, 0.0075, 8, 220)
    const ringMatA = new THREE.MeshBasicMaterial({ color: 0xf4f2ec, transparent: true, opacity: 0.2 })
    const ringA = new THREE.Mesh(ringGeoA, ringMatA)

    const ringGeoB = new THREE.TorusGeometry(5.7, 0.005, 8, 220)
    const ringMatB = new THREE.MeshBasicMaterial({ color: 0xf4f2ec, transparent: true, opacity: 0.1 })
    const ringB = new THREE.Mesh(ringGeoB, ringMatB)

    /* ————————————————— background dust ————————————————— */

    const DUST_COUNT = isMobile ? 420 : 850
    const dustPos = new Float32Array(DUST_COUNT * 3)
    const dustSize = new Float32Array(DUST_COUNT)
    const dustPhase = new Float32Array(DUST_COUNT)
    const dustSpeed = new Float32Array(DUST_COUNT)
    for (let i = 0; i < DUST_COUNT; i++) {
      const radius = 15 + Math.random() * 30
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      dustPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      dustPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      dustPos[i * 3 + 2] = radius * Math.cos(phi)
      dustSize[i] = 0.5 + Math.random() * 1.2
      dustPhase[i] = Math.random() * Math.PI * 2
      dustSpeed[i] = 0.3 + Math.random() * 1.2
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
    dustGeo.setAttribute('aSize', new THREE.BufferAttribute(dustSize, 1))
    dustGeo.setAttribute('aPhase', new THREE.BufferAttribute(dustPhase, 1))
    dustGeo.setAttribute('aSpeed', new THREE.BufferAttribute(dustSpeed, 1))
    const dustMat = new THREE.ShaderMaterial({
      vertexShader: dustVert,
      fragmentShader: dustFrag,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: dpr },
        uOpacity: { value: reduced ? 1 : 0 },
      },
    })
    const dust = new THREE.Points(dustGeo, dustMat)

    /* ————————————————— composition ————————————————— */

    const system = new THREE.Group()
    const diskGroup = new THREE.Group()
    diskGroup.rotation.x = 0.46
    diskGroup.rotation.z = -0.12
    diskGroup.add(disk)
    system.add(diskGroup)

    const ringGroupA = new THREE.Group()
    ringGroupA.rotation.set(1.08, 0, 0.34)
    ringGroupA.add(ringA)
    const ringGroupB = new THREE.Group()
    ringGroupB.rotation.set(1.32, 0, -0.52)
    ringGroupB.add(ringB)
    system.add(core, ringGroupA, ringGroupB)

    // Compose to the lower-right of frame so display type owns the top-left
    system.position.set(isMobile ? 0.9 : 2.6, isMobile ? -3.6 : -1.7, 0)
    system.scale.setScalar(isMobile ? 0.6 : 1)
    system.rotation.y = 0.35
    scene.add(system, dust)

    /* ————————————————— interaction state ————————————————— */

    const pointer = { x: 0, y: 0 }
    const pointerLerp = { x: 0, y: 0 }
    const rotVel = { x: 0, y: 0 }
    let dragging = false
    let dragArmed = false
    let lastX = 0
    let lastY = 0
    let scrollY = window.scrollY
    let scrollLerp = scrollY
    let introT = 0

    const isInteractive = (el: EventTarget | null) =>
      el instanceof Element &&
      !!el.closest('a, button, input, textarea, select, [role="button"], [data-no-drag]')

    const onPointerDown = (e: PointerEvent) => {
      if (isInteractive(e.target)) return
      dragArmed = true
      dragging = false
      lastX = e.clientX
      lastY = e.clientY
    }

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)

      if (!dragArmed || reduced) return
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      if (!dragging && Math.hypot(dx, dy) > 4) {
        dragging = true
        document.body.classList.add('is-dragging')
      }
      if (dragging) {
        rotVel.y += dx * 0.00042
        rotVel.x += dy * 0.00042
      }
      lastX = e.clientX
      lastY = e.clientY
    }

    const onPointerUp = () => {
      dragArmed = false
      dragging = false
      document.body.classList.remove('is-dragging')
    }

    const onScroll = () => {
      scrollY = window.scrollY
    }

    if (!reduced) {
      window.addEventListener('pointerdown', onPointerDown, { passive: true })
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('pointerup', onPointerUp, { passive: true })
      window.addEventListener('pointercancel', onPointerUp, { passive: true })
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      if (reduced) renderer.render(scene, camera)
    }
    window.addEventListener('resize', onResize)

    let visible = !document.hidden
    const onVisibility = () => {
      visible = !document.hidden
    }
    document.addEventListener('visibilitychange', onVisibility)

    /* ————————————————— render loop ————————————————— */

    const startMs = performance.now()
    let raf = 0

    const renderOnce = (t: number) => {
      diskMat.uniforms.uTime.value = t
      dustMat.uniforms.uTime.value = t
      renderer.render(scene, camera)
    }

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return

      const nowMs = performance.now()
      const t = (nowMs - startMs) / 1000

      // intro fade-in
      introT = Math.min(introT + 0.016, 1.4)
      const intro = 1 - Math.pow(1 - Math.min(introT / 1.4, 1), 3)
      const scrollFade = 1 - Math.min(scrollLerp / (isMobile ? 1500 : 2300), isMobile ? 0.8 : 0.58)
      diskMat.uniforms.uOpacity.value = intro * scrollFade
      dustMat.uniforms.uOpacity.value = intro
      ;(glow.material as THREE.SpriteMaterial).opacity = 0.9 * intro * (0.3 + 0.7 * scrollFade)

      // parallax + scroll dolly
      pointerLerp.x += (pointer.x - pointerLerp.x) * 0.045
      pointerLerp.y += (pointer.y - pointerLerp.y) * 0.045
      scrollLerp += (scrollY - scrollLerp) * 0.06
      camera.position.x = pointerLerp.x * 0.75
      camera.position.y = 0.4 + pointerLerp.y * 0.45 + scrollLerp * 0.0011
      camera.position.z = 12.6 + scrollLerp * 0.0009 + Math.sin(t * 0.07) * 0.25
      camera.lookAt(0, scrollLerp * 0.0008, 0)

      // drag inertia + idle drift
      system.rotation.y += rotVel.y + 0.00016
      system.rotation.x += rotVel.x
      rotVel.x *= 0.93
      rotVel.y *= 0.93

      // core and rings live their own slow lives
      innerWire.rotation.y = t * 0.12
      innerWire.rotation.x = Math.sin(t * 0.11) * 0.3
      outerWire.rotation.y = -t * 0.07
      outerWire.rotation.z = Math.cos(t * 0.09) * 0.25
      ringGroupA.rotation.z = 0.34 + Math.sin(t * 0.05) * 0.16
      ringGroupB.rotation.z = -0.52 - t * 0.016
      glow.scale.setScalar(2.1 + Math.sin(t * 0.6) * 0.1)

      diskGroup.rotation.y = t * 0.008

      renderOnce(t)
    }

    if (reduced) {
      // single composed frame — no loop, no motion
      system.rotation.y = 0.55
      system.rotation.x = 0.08
      innerWire.rotation.y = 0.8
      outerWire.rotation.y = -0.4
      renderOnce(4.2)
      raf = 0
    } else {
      tick()
    }

    /* ————————————————— cleanup ————————————————— */

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      diskGeo.dispose()
      diskMat.dispose()
      innerGeo.dispose()
      innerWire.geometry.dispose()
      ;(innerWire.material as THREE.Material).dispose()
      outerGeo.dispose()
      outerWire.geometry.dispose()
      ;(outerWire.material as THREE.Material).dispose()
      nodeGeo.dispose()
      nodeGeoDetail.dispose()
      nodeMat.dispose()
      glowTex.dispose()
      ;(glow.material as THREE.Material).dispose()
      ringGeoA.dispose()
      ringMatA.dispose()
      ringGeoB.dispose()
      ringMatB.dispose()
      dustGeo.dispose()
      dustMat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true" style={{ touchAction: 'pan-y' }}>
      <canvas ref={canvasRef} className="block h-full w-full" />
      {/* ember horizon + vignette for text legibility */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 34% at 62% 62%, rgba(255,95,35,0.05), transparent 68%), radial-gradient(ellipse 60% 45% at 58% 45%, rgba(244,242,236,0.028), transparent 65%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,5,5,0.55) 0%, transparent 20%, transparent 80%, rgba(5,5,5,0.6) 100%)',
        }}
      />
    </div>
  )
}
