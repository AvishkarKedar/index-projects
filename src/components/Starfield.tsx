import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Grok-style interactive starfield.
 *
 * - Three depth layers of twinkling stars (custom GLSL point shader)
 * - A wireframe icosahedron centerpiece with vertex particles
 * - Mouse parallax (pointer position) + drag-to-rotate with inertia
 * - Scroll drift for cinematic depth while navigating the page
 * - Respects prefers-reduced-motion, pauses when tab is hidden
 */
export default function Starfield() {
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
      return // WebGL unavailable — graceful black fallback
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    renderer.setPixelRatio(dpr)
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    )
    camera.position.set(0, 0, 11)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* ————————————————— STARFIELD ————————————————— */
    const STAR_COUNT = 2600
    const positions = new Float32Array(STAR_COUNT * 3)
    const sizes = new Float32Array(STAR_COUNT)
    const phases = new Float32Array(STAR_COUNT)
    const speeds = new Float32Array(STAR_COUNT)
    const depths = new Float32Array(STAR_COUNT)

    for (let i = 0; i < STAR_COUNT; i++) {
      // Distributed in a large shell so stars surround the camera
      const radius = 16 + Math.random() * 44
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      const layer = Math.random()
      // Far layer: tiny + dense, near layer: sparse + bright
      sizes[i] = layer < 0.72 ? 0.7 + Math.random() * 0.9 : 1.6 + Math.random() * 2.2
      phases[i] = Math.random() * Math.PI * 2
      speeds[i] = 0.4 + Math.random() * 1.8
      depths[i] = layer
    }

    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    starGeo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    starGeo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
    starGeo.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1))
    starGeo.setAttribute('aDepth', new THREE.BufferAttribute(depths, 1))

    const starMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: dpr },
        uReduced: { value: reduced ? 1 : 0 },
        uOpacity: { value: 1 },
      },
      vertexShader: /* glsl */ `
        attribute float aSize;
        attribute float aPhase;
        attribute float aSpeed;
        attribute float aDepth;
        uniform float uTime;
        uniform float uPixelRatio;
        uniform float uReduced;
        varying float vAlpha;
        varying float vTint;

        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          float twinkle = 0.62 + 0.38 * sin(uTime * aSpeed + aPhase);
          // near stars get a brighter floor, far stars stay dim
          float floorLevel = mix(0.35, 0.55, aDepth);
          vAlpha = mix(floorLevel + (1.0 - floorLevel) * twinkle, 0.8, uReduced);
          vTint = aDepth;
          gl_PointSize = aSize * uPixelRatio * (260.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uOpacity;
        varying float vAlpha;
        varying float vTint;

        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          float a = smoothstep(0.5, 0.02, d);
          a = pow(a, 2.4);
          // monochrome — near stars pure white, far stars faint gray
          vec3 col = mix(vec3(0.72), vec3(1.0), vTint);
          gl_FragColor = vec4(col, a * vAlpha * uOpacity);
        }
      `,
    })

    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    /* ————————————————— CENTERPIECE ————————————————— */
    const centerpiece = new THREE.Group()

    const icoGeo = new THREE.IcosahedronGeometry(3.1, 1)
    const icoWire = new THREE.LineSegments(
      new THREE.WireframeGeometry(icoGeo),
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.07,
      })
    )
    centerpiece.add(icoWire)

    // Vertex particles on a higher-detail icosahedron
    const detailGeo = new THREE.IcosahedronGeometry(3.1, 2)
    const nodePositions = detailGeo.getAttribute('position')
    const nodeCount = nodePositions.count
    const nodeArr = new Float32Array(nodeCount * 3)
    for (let i = 0; i < nodeCount; i++) {
      nodeArr[i * 3] = nodePositions.getX(i)
      nodeArr[i * 3 + 1] = nodePositions.getY(i)
      nodeArr[i * 3 + 2] = nodePositions.getZ(i)
    }
    const nodeGeo = new THREE.BufferGeometry()
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodeArr, 3))
    const nodeMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.045,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    centerpiece.add(new THREE.Points(nodeGeo, nodeMat))

    // Inner glow ring — thin torus, very subtle
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(4.4, 0.006, 8, 128),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.16 })
    )
    ring.rotation.x = Math.PI / 2.4
    centerpiece.add(ring)

    centerpiece.position.set(0, -0.1, 0)
    scene.add(centerpiece)

    /* ————————————————— INTERACTION STATE ————————————————— */
    const pointer = { x: 0, y: 0 }            // normalized -1..1 (lerped target)
    const pointerLerp = { x: 0, y: 0 }
    const rot = { x: 0, y: 0 }                // accumulated drag rotation (stars)
    const rotVel = { x: 0, y: 0 }             // drag inertia
    const objRot = { x: 0.2, y: 0.4 }         // centerpiece rotation
    const objVel = { x: 0, y: 0 }
    let dragging = false
    let dragArmed = false
    let lastX = 0
    let lastY = 0
    let scrollY = window.scrollY
    let scrollLerp = scrollY

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

      if (!dragArmed) return
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY

      if (!dragging && Math.hypot(dx, dy) > 4) {
        dragging = true
        document.body.classList.add('is-dragging')
      }
      if (dragging) {
        const kx = dy * 0.0022
        const ky = dx * 0.0022
        rotVel.x += kx * 0.5
        rotVel.y += ky * 0.5
        objVel.x += kx * 2.2
        objVel.y += ky * 2.2
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

    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerup', onPointerUp, { passive: true })
    window.addEventListener('pointercancel', onPointerUp, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    /* ————————————————— RESIZE / VISIBILITY ————————————————— */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    let visible = true
    const onVisibility = () => {
      visible = !document.hidden
    }
    document.addEventListener('visibilitychange', onVisibility)

    /* ————————————————— RENDER LOOP ————————————————— */
    const clock = new THREE.Clock()
    let raf = 0

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return

      const t = clock.getElapsedTime()

      if (!reduced) {
        // Smooth pointer + scroll
        pointerLerp.x += (pointer.x - pointerLerp.x) * 0.045
        pointerLerp.y += (pointer.y - pointerLerp.y) * 0.045
        scrollLerp += (scrollY - scrollLerp) * 0.06

        // Drag inertia + constant idle drift
        rot.x += rotVel.x + 0.00012
        rot.y += rotVel.y + 0.00018
        rotVel.x *= 0.94
        rotVel.y *= 0.94

        stars.rotation.x = rot.x
        stars.rotation.y = rot.y

        // Parallax: camera leans toward pointer, drifts with scroll
        camera.position.x = pointerLerp.x * 0.9
        camera.position.y = pointerLerp.y * 0.6 + scrollLerp * 0.0016
        camera.position.z = 11 + Math.sin(t * 0.08) * 0.4
        camera.lookAt(0, scrollLerp * 0.0012, 0)

        // Centerpiece: idle spin + drag velocity + breathing scale
        objRot.x += objVel.x + 0.0016
        objRot.y += objVel.y + 0.0024
        objVel.x *= 0.93
        objVel.y *= 0.93
        centerpiece.rotation.x = objRot.x
        centerpiece.rotation.y = objRot.y
        const breathe = 1 + Math.sin(t * 0.55) * 0.02
        centerpiece.scale.setScalar(breathe)
        ring.rotation.z = t * 0.05

        starMat.uniforms.uTime.value = t
      } else {
        // Static but still composed
        centerpiece.rotation.y = 0.4
        ring.rotation.z = 0
      }

      // Fade stars slightly when modal-heavy content sits on top (scroll depth)
      const fade = Math.max(0.55, 1 - scrollLerp / (document.body.scrollHeight || 1) * 0.2)
      starMat.uniforms.uOpacity.value = fade

      renderer.render(scene, camera)
    }
    tick()

    /* ————————————————— CLEANUP ————————————————— */
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      starGeo.dispose()
      starMat.dispose()
      icoGeo.dispose()
      icoWire.geometry.dispose()
      ;(icoWire.material as THREE.Material).dispose()
      nodeGeo.dispose()
      nodeMat.dispose()
      detailGeo.dispose()
      ring.geometry.dispose()
      ;(ring.material as THREE.Material).dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true" data-no-drag-skip>
      <canvas ref={canvasRef} className="block h-full w-full" />
      {/* Nebula glow — soft monochrome wash, pure CSS */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 50% 42%, rgba(255,255,255,0.05), transparent 65%), radial-gradient(ellipse 40% 30% at 78% 18%, rgba(255,255,255,0.025), transparent 70%)',
        }}
      />
      {/* Vignette for text legibility */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.55) 100%)',
        }}
      />
    </div>
  )
}
