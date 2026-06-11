import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import useUIStore from '#store/ui.js'

// app icons reused as the trail flair — two rounds so quick wiggles
// don't recycle an icon that is still mid-animation
const TRAIL_ICONS = [
  'AppStore.svg',
  'Books.svg',
  'Calculator.svg',
  'Camera.svg',
  'Clock.svg',
  'Contacts.svg',
  'Fitness.svg',
  'Freeform.svg',
  'Health.svg',
  'Maps.svg',
  'Music.svg',
  'Notes.svg',
  'Passwords.svg',
  'Photos.svg',
  'Safari.svg',
  'Settings.svg',
  'TV.svg',
  'Weather.svg',
]
const FLAIR_COUNT = TRAIL_ICONS.length * 2

// minimum cursor travel (px) between spawned icons
const GAP = 110

const playAnimation = (shape) => {
  gsap
    .timeline()
    .from(shape, {
      opacity: 0,
      scale: 0,
      ease: 'elastic.out(1,0.3)',
      duration: 1,
    })
    .to(shape, { rotation: 'random([-360, 360])', duration: 1 }, '<')
    .to(shape, { y: '120vh', ease: 'back.in(.4)', duration: 1 }, 0)
}

const MouseTrail = () => {
  const containerRef = useRef(null)
  const isTrailEnabled = useUIStore((state) => state.isTrailEnabled)

  useGSAP(
    () => {
      if (!isTrailEnabled) return

      const flair = gsap.utils.toArray('.flair', containerRef.current)
      const wrap = gsap.utils.wrap(0, flair.length)
      let index = 0
      let mousePos = { x: 0, y: 0 }
      let lastMousePos = mousePos

      const onMouseMove = (e) => {
        mousePos = { x: e.x, y: e.y }
      }

      const spawn = () => {
        const img = flair[wrap(index)]
        gsap.killTweensOf(img)
        gsap.set(img, { clearProps: 'all' })
        gsap.set(img, {
          opacity: 1,
          left: mousePos.x,
          top: mousePos.y,
          xPercent: -50,
          yPercent: -50,
        })
        playAnimation(img)
        index++
      }

      const tick = () => {
        const travelDistance = Math.hypot(
          lastMousePos.x - mousePos.x,
          lastMousePos.y - mousePos.y,
        )
        if (travelDistance > GAP) {
          spawn()
          lastMousePos = mousePos
        }
      }

      window.addEventListener('mousemove', onMouseMove)
      gsap.ticker.add(tick)

      return () => {
        window.removeEventListener('mousemove', onMouseMove)
        gsap.ticker.remove(tick)
      }
    },
    // revertOnUpdate tears down the listener, ticker, and any in-flight
    // tweens the moment the toggle flips off
    {
      scope: containerRef,
      dependencies: [isTrailEnabled],
      revertOnUpdate: true,
    },
  )

  if (!isTrailEnabled) return null

  return (
    <div ref={containerRef} aria-hidden="true">
      {Array.from({ length: FLAIR_COUNT }, (_, i) => {
        const icon = TRAIL_ICONS[i % TRAIL_ICONS.length]
        return (
          <img
            // the list is static, so the index is a stable key here
            key={`${icon}-${i}`}
            src={`/wiggleIcons/${icon}`}
            alt=""
            loading="lazy"
            // z-[900] keeps the trail above the wallpaper and welcome text
            // but below every window (those start at z-index 1000)
            className="flair pointer-events-none fixed z-[900] w-12 opacity-0 select-none"
          />
        )
      })}
    </div>
  )
}

export default MouseTrail
