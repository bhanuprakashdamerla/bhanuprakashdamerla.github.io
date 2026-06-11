import dayjs from 'dayjs'
import { Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navIcons, navLinks } from '#constants'
import useUIStore from '#store/ui.js'

const CLOCK_FORMAT = 'ddd MMM D h:mm A'

const Navbar = () => {
  const { isTrailEnabled, toggleTrail } = useUIStore()
  const [time, setTime] = useState(() => dayjs().format(CLOCK_FORMAT))

  useEffect(() => {
    // checking every second keeps the minute flip accurate; setting an
    // identical string lets React skip the re-render in between
    const id = setInterval(() => setTime(dayjs().format(CLOCK_FORMAT)), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Bhanu's Portfolio</p>

        <ul>
          {navLinks.map((item) => (
            <li key={item.id}>
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          <li>
            <button
              type="button"
              className="icon flex-center cursor-pointer"
              onClick={toggleTrail}
              aria-pressed={isTrailEnabled}
              title={
                isTrailEnabled ? 'Disable mouse trail' : 'Enable mouse trail'
              }
            >
              <Sparkles
                size={16}
                className={isTrailEnabled ? 'text-blue-600' : 'text-black'}
                fill={isTrailEnabled ? 'currentColor' : 'black'}
              />
            </button>
          </li>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} className="icon-hover" alt={`icon-${id}`} />
            </li>
          ))}
        </ul>

        <time>{time}</time>
      </div>
    </nav>
  )
}

export default Navbar
