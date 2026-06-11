import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

const FONT_WEIGHTS = {
  subtitle: {
    min: 100,
    max: 400,
    base: 100,
  },
  title: {
    min: 400,
    max: 900,
    base: 400,
  },
}

const animateLetter = (letter, weight, duration = 0.25) => {
  return gsap.to(letter, {
    duration: duration,
    ease: 'power2.out',
    fontVariationSettings: `'wght' ${weight}`,
  })
}

const setupTextHover = (container, type) => {
  if (!container) return () => {}

  const letters = container.querySelectorAll('span')
  const { min, max, base } = FONT_WEIGHTS[type]

  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetter(letter, base, 0.3)
    })
  }

  const handleMouseMove = (event) => {
    const { left } = container.getBoundingClientRect()
    const mouseX = event.clientX - left

    letters.forEach((letter) => {
      const { left: L, width: W } = letter.getBoundingClientRect()
      const distance = Math.abs(mouseX - (L - left + W / 2))
      const intensity = Math.exp(-(distance ** 2) / 20000)
      const letterWeight = min + (max - min) * intensity
      animateLetter(letter, letterWeight)
    })
  }

  container.addEventListener('mousemove', handleMouseMove)
  container.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    container.removeEventListener('mousemove', handleMouseMove)
    container.removeEventListener('mouseleave', handleMouseLeave)
  }
}

const renderText = (text, classNames, baseWeight = 400) => {
  return [...text].map((character, i) => (
    <span
      key={i}
      className={classNames}
      style={{
        fontVariationSettings: `'wght' ${baseWeight}`,
      }}
    >
      {character === ' ' ? '\u00A0' : character}
    </span>
  ))
}

const Welcome = () => {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)

  useGSAP(() => {
    const titleCleanup = setupTextHover(titleRef.current, 'title')
    const subtitleCleanup = setupTextHover(subtitleRef.current, 'subtitle')

    return () => {
      titleCleanup()
      subtitleCleanup()
    }
  }, [])

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText(
          "Hey I'm Bhanu Prakash. Welcome to my",
          'text-3xl font-georama',
          100,
        )}
      </p>

      <h1 ref={titleRef} className="mt-7">
        {renderText('Portfolio', 'text-9xl italic font-georama')}
      </h1>

      <div className="small-screen">
        <p>This portfolio is designed for desktop and tablet screens only</p>
      </div>
    </section>
  )
}

export default Welcome
