import { socials } from '#constants';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import WindowControls from '#components/WindowControls.jsx';

const Contact = (props) => {
  return (
    <section id="contact" {...props}>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Get in Touch</h2>
      </div>

      <div className="p-7 space-y-7">
        <div className="space-y-2">
          <h3>Let&apos;s connect</h3>
          <p className="text-sm text-gray-500">
            Reach out through any of these platforms — I&apos;m always happy to
            talk about new projects and opportunities.
          </p>
        </div>

        <ul>
          {socials.map(({ id, text, icon, bg, link }) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <img src={icon} alt={text} className="w-7" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WindowWrapper(Contact, 'contact');
