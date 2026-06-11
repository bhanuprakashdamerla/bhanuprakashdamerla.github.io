import { useState } from 'react';
import { photosLinks, gallery } from '#constants';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import WindowControls from '#components/WindowControls.jsx';

const Photos = (props) => {
  const [activeLink, setActiveLink] = useState(photosLinks[0]);

  return (
    <section id="photos" {...props}>
      <div className="flex h-[380px]">
        <div className="sidebar">
          <WindowControls target="photos" />

          <h2>Photos</h2>
          <ul>
            {photosLinks.map((link) => (
              <li
                key={link.id}
                className={link.id === activeLink.id ? 'active' : ''}
                onClick={() => setActiveLink(link)}
              >
                <img src={link.icon} alt="" />
                <p>{link.title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="gallery">
          <div className="gallery-header">
            <h2>{activeLink.title}</h2>
            <p>{gallery.length} photos</p>
          </div>

          <ul>
            {gallery.map(({ id, img }) => (
              <li key={id}>
                <img src={img} alt={`gallery-${id}`} loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WindowWrapper(Photos, 'photos');
