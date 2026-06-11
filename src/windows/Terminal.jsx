import dayjs from 'dayjs'
import { Check } from 'lucide-react'
import WindowControls from '#components/WindowControls.jsx'
import { techStack } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper.jsx'

const Terminal = (props) => {
  return (
    <section id="terminal" {...props}>
      <div id="window-header">
        <WindowControls target="terminal" />
        <h2>bhanu@portfolio — skills</h2>
      </div>

      <div className="techstack">
        <p>Last login: {dayjs().format('ddd MMM D HH:mm:ss')} on console</p>
        <p className="label">bhanu@portfolio ~ % show skills</p>

        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li key={category} className="flex items-center">
              <Check className="check" />
              <h3>{category}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="footnote">
          <p>
            <Check /> All skills loaded successfully
          </p>
          <p>bhanu@portfolio ~ %</p>
        </div>
      </div>
    </section>
  )
}

export default WindowWrapper(Terminal, 'terminal')
