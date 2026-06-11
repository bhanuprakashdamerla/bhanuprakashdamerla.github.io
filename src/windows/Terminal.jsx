import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import WindowControls from '#components/WindowControls.jsx'
import { locations, socials, techStack } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper.jsx'
import useWindowStore from '#store/window.js'

const PROMPT = 'bhanu@portfolio ~ %'

const COMMANDS = [
  { name: 'help', description: 'List all available commands' },
  { name: 'about', description: 'Who I am' },
  { name: 'projects', description: 'Browse my projects' },
  { name: 'skills', description: 'My tech stack' },
  { name: 'socials', description: 'Where to find me online' },
  { name: 'contact', description: 'Get in touch' },
  { name: 'gallery', description: 'Open the photo gallery' },
  { name: 'resume', description: 'View my resume' },
  { name: 'clear', description: 'Clear the terminal' },
]

// a string is typeable only while it can still become a command,
// with or without the leading slash
const canBecomeCommand = (value) =>
  COMMANDS.some(
    ({ name }) => `/${name}`.startsWith(value) || name.startsWith(value),
  )

const OutputLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-sky-400 hover:underline"
  >
    {children}
  </a>
)

const HelpOutput = () => (
  <ul className="space-y-0.5">
    {COMMANDS.map(({ name, description }) => (
      <li key={name} className="flex">
        <span className="w-28 shrink-0 text-emerald-400">/{name}</span>
        <span className="text-gray-400">{description}</span>
      </li>
    ))}
  </ul>
)

const AboutOutput = () => {
  const aboutFile = locations.about.children.find(
    (child) => child.fileType === 'txt',
  )

  return (
    <div className="space-y-1.5">
      {aboutFile?.subtitle && (
        <p className="font-semibold text-emerald-400">{aboutFile.subtitle}</p>
      )}
      {aboutFile?.description.map((line) => (
        <p key={line} className="text-gray-300">
          {line}
        </p>
      ))}
    </div>
  )
}

const ProjectsOutput = () => {
  const projects = locations.work.children.filter(
    (child) => child.kind === 'folder',
  )

  return (
    <div className="space-y-3">
      {projects.map((project) => {
        const txt = project.children.find((c) => c.fileType === 'txt')
        const url = project.children.find((c) => c.fileType === 'url')

        return (
          <div key={project.id}>
            <p className="font-semibold text-emerald-400">{project.name}</p>
            {txt && <p className="text-gray-300">{txt.description[0]}</p>}
            {url?.href && <OutputLink href={url.href}>{url.name}</OutputLink>}
          </div>
        )
      })}
      <p className="text-gray-500">
        Tip: open the Portfolio app in the dock to explore the project files.
      </p>
    </div>
  )
}

const SkillsOutput = () => (
  <ul className="space-y-0.5">
    {techStack.map(({ category, items }) => (
      <li key={category} className="flex">
        <span className="w-28 shrink-0 text-emerald-400">{category}</span>
        <span className="text-gray-300">{items.join(', ')}</span>
      </li>
    ))}
  </ul>
)

const SocialsOutput = () => (
  <ul className="space-y-0.5">
    {socials.map(({ id, text, link }) => (
      <li key={id} className="flex">
        <span className="w-28 shrink-0 text-emerald-400">{text}</span>
        <OutputLink href={link}>{link.replace('mailto:', '')}</OutputLink>
      </li>
    ))}
  </ul>
)

const ContactOutput = () => {
  const email = socials.find(({ text }) => text === 'Email')

  return (
    <div className="space-y-1">
      <p className="text-gray-300">
        The fastest way to reach me is by email:{' '}
        {email && (
          <OutputLink href={email.link}>
            {email.link.replace('mailto:', '')}
          </OutputLink>
        )}
      </p>
      <p className="text-gray-500">
        Or type /socials to find me elsewhere online.
      </p>
    </div>
  )
}

const Terminal = (props) => {
  const { openWindow } = useWindowStore()
  const [history, setHistory] = useState([])
  const [value, setValue] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef(null)
  const scrollRef = useRef(null)
  const entryId = useRef(0)

  const query = value.replace(/^\//, '')
  const suggestions = value
    ? COMMANDS.filter(({ name }) => name.startsWith(query))
    : []

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll reacts to new entries
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [history])

  const execute = (name) => {
    if (name === 'clear') {
      setHistory([])
      return
    }

    let node = null
    switch (name) {
      case 'help':
        node = <HelpOutput />
        break
      case 'about':
        node = <AboutOutput />
        break
      case 'projects':
        node = <ProjectsOutput />
        break
      case 'skills':
        node = <SkillsOutput />
        break
      case 'socials':
        node = <SocialsOutput />
        break
      case 'contact':
        node = <ContactOutput />
        break
      case 'gallery':
        openWindow('photos')
        node = <p className="text-gray-400">Opening the gallery…</p>
        break
      case 'resume':
        window.open('/files/resume.pdf', '_blank', 'noopener,noreferrer')
        node = <p className="text-gray-400">Opening my resume…</p>
        break
      default:
        node = <p className="text-red-400">command not found: {name}</p>
    }

    entryId.current++
    setHistory((prev) => [
      ...prev,
      { id: entryId.current, cmd: `/${name}`, node },
    ])
  }

  const submit = () => {
    if (suggestions.length > 0) {
      execute(suggestions[Math.min(selected, suggestions.length - 1)].name)
    } else if (value === '') {
      // an empty enter echoes a blank prompt line, like a real shell
      entryId.current++
      setHistory((prev) => [
        ...prev,
        { id: entryId.current, cmd: '', node: null },
      ])
    }
    setValue('')
    setSelected(0)
  }

  const onChange = (e) => {
    const next = e.target.value.toLowerCase()
    // reject any input that can no longer become a valid command
    if (next === '' || canBecomeCommand(next)) {
      setValue(next)
      setSelected(0)
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      submit()
    } else if (e.key === 'Tab') {
      e.preventDefault()
      if (suggestions.length > 0) {
        setValue(
          `/${suggestions[Math.min(selected, suggestions.length - 1)].name}`,
        )
      }
    } else if (e.key === 'ArrowDown' && suggestions.length > 0) {
      e.preventDefault()
      setSelected((prev) => (prev + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp' && suggestions.length > 0) {
      e.preventDefault()
      setSelected(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length,
      )
    } else if (e.key === 'Escape') {
      setValue('')
      setSelected(0)
    }
  }

  return (
    <section id="terminal" {...props}>
      <div id="window-header">
        <WindowControls target="terminal" />
        <h2>bhanu@portfolio — zsh</h2>
      </div>

      {/* clicking anywhere in the shell refocuses the prompt, like a real
          terminal — keyboard users interact with the input directly */}
      {/* biome-ignore lint/a11y/noStaticElementInteractions: see above */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: see above */}
      <div
        className="flex h-96 flex-col bg-[#16181d] font-roboto text-[13px] leading-relaxed text-gray-200"
        onClick={() => inputRef.current?.focus()}
      >
        {/* scrollback — only history lives here, so the completion menu can
            never move it */}
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
          <div className="text-gray-500">
            <p>Last login: {dayjs().format('ddd MMM D HH:mm:ss')} on console</p>
            <p className="mt-1 text-gray-300">
              Welcome to my portfolio terminal! Type{' '}
              <span className="text-emerald-400">/</span> to see the available
              commands.
            </p>
          </div>

          {history.map(({ id, cmd, node }) => (
            <div key={id} className="space-y-1.5">
              <p>
                <span className="text-emerald-400">{PROMPT}</span>{' '}
                <span className="text-white">{cmd}</span>
              </p>
              {node}
            </div>
          ))}
        </div>

        {/* prompt row pinned at the bottom; the completion menu overlays the
            scrollback above it without affecting layout */}
        <div className="relative px-4 pb-3">
          {suggestions.length > 0 && (
            <ul className="absolute bottom-full left-40 z-10 mb-1 w-72 overflow-hidden rounded-lg border border-white/10 bg-[#23262e] py-1 shadow-2xl">
              {suggestions.map(({ name, description }, index) => (
                <li key={name}>
                  <button
                    type="button"
                    className={`flex w-full items-center px-3 py-1.5 text-left ${
                      index === selected ? 'bg-sky-500/20' : ''
                    }`}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      execute(name)
                      setValue('')
                      setSelected(0)
                    }}
                    onMouseEnter={() => setSelected(index)}
                  >
                    <span className="w-24 shrink-0 text-emerald-400">
                      /{name}
                    </span>
                    <span className="truncate text-xs text-gray-400">
                      {description}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center gap-2">
            <span className="shrink-0 text-emerald-400">{PROMPT}</span>
            <input
              ref={inputRef}
              value={value}
              onChange={onChange}
              onKeyDown={onKeyDown}
              className="min-w-0 flex-1 bg-transparent text-white caret-emerald-400 outline-none"
              spellCheck={false}
              autoComplete="off"
              aria-label="terminal command input"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default WindowWrapper(Terminal, 'terminal')
