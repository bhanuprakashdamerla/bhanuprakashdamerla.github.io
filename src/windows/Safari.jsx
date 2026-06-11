import { ArrowRight } from 'lucide-react';
import { blogPosts } from '#constants';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import WindowControls from '#components/WindowControls.jsx';

const Safari = (props) => {
  return (
    <section id="safari" {...props}>
      <div id="window-header">
        <WindowControls target="safari" />

        <div className="search">
          <img src="/icons/search.svg" alt="search" className="w-4" />
          <input
            type="text"
            placeholder="Search or enter website name"
            readOnly
          />
        </div>

        <img src="/icons/share.svg" alt="share" className="icon w-6" />
      </div>

      <div className="blog">
        <h2>Latest Articles</h2>

        <ul className="space-y-10">
          {blogPosts.map(({ id, date, title, image, link }) => (
            <li key={id} className="blog-post">
              <div className="col-span-2">
                <img src={image} alt={title} />
              </div>

              <div className="content">
                <p>{date}</p>
                <h3>{title}</h3>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  Read More <ArrowRight size={12} />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WindowWrapper(Safari, 'safari');
