import { useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';
import useWindowStore from '#store/window.js';

gsap.registerPlugin(Draggable);

// the desktop area between the menu bar and the dock — windows can't be
// dragged over either, mirroring macOS
const getDesktopBounds = () => {
  const nav = document.querySelector('nav');
  const dock = document.querySelector('#dock');
  const top = nav ? nav.getBoundingClientRect().bottom : 0;
  const bottom = dock ? dock.getBoundingClientRect().top : window.innerHeight;

  return { top, left: 0, width: window.innerWidth, height: bottom - top };
};

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = () => {
    const windowRef = useRef(null);
    const { windows, focusWindow } = useWindowStore();
    const { isOpen, zIndex, data } = windows[windowKey];

    useGSAP(
      () => {
        const el = windowRef.current;
        if (!el || !isOpen) return;

        gsap.fromTo(
          el,
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.25, ease: 'power2.out' }
        );

        Draggable.create(el, {
          // drag by the title bar when the window has one, otherwise anywhere
          trigger: el.querySelector('#window-header') ?? el,
          bounds: getDesktopBounds(),
          // Draggable's default zIndexBoost writes its own z-index on press,
          // fighting the store-managed layering — the store is the only owner
          zIndexBoost: false,
          onPress: function () {
            focusWindow(windowKey);
            // recalculate in case the viewport changed since creation
            this.applyBounds(getDesktopBounds());
          },
        });
      },
      { dependencies: [isOpen], revertOnUpdate: true }
    );

    if (!isOpen) return null;

    return (
      <Component
        ref={windowRef}
        data={data}
        style={{ zIndex }}
        onMouseDown={() => focusWindow(windowKey)}
      />
    );
  };

  Wrapped.displayName = `WindowWrapper(${windowKey})`;
  return Wrapped;
};

export default WindowWrapper;
