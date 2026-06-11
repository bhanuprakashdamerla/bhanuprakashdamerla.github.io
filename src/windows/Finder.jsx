import { useState } from 'react'
import WindowControls from '#components/WindowControls.jsx'
import { locations } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper.jsx'
import useWindowStore from '#store/window.js'

const SIDEBAR_LOCATIONS = [locations.work, locations.about]

const Finder = (props) => {
  const { openWindow } = useWindowStore()
  const [activeLocation, setActiveLocation] = useState(locations.work)
  const [activeNode, setActiveNode] = useState(locations.work)

  const selectLocation = (location) => {
    setActiveLocation(location)
    setActiveNode(location)
  }

  const openItem = (item) => {
    switch (item.kind === 'folder' ? 'folder' : item.fileType) {
      case 'folder':
        setActiveNode(item)
        break
      case 'url':
      case 'fig':
        window.open(item.href, '_blank', 'noopener,noreferrer')
        break
      case 'txt':
        openWindow('txtfile', item)
        break
      case 'img':
        openWindow('imgfile', item)
        break
      default:
        break
    }
  }

  return (
    <section id="finder" {...props}>
      <div className="flex h-[55vh] min-h-96">
        <div className="sidebar">
          <WindowControls target="finder" />

          <h3 className="mt-3">Favorites</h3>
          <ul>
            {SIDEBAR_LOCATIONS.map((location) => (
              <li
                key={location.id}
                className={
                  activeLocation.type === location.type
                    ? 'active'
                    : 'not-active'
                }
                onClick={() => selectLocation(location)}
              >
                <img src={location.icon} alt="" className="w-4" />
                <p className="text-sm font-medium">{location.name}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 bg-white">
          <div id="window-header">
            <h2 className="font-bold text-sm text-center flex-1 text-gray-600">
              {activeNode.name}
            </h2>
          </div>

          <ul className="content">
            {activeNode.children?.map((item) => (
              <li
                key={item.id}
                className={`group cursor-pointer ${item.position ?? ''}`}
                onClick={() => openItem(item)}
              >
                <img src={item.icon} alt={item.name} />
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default WindowWrapper(Finder, 'finder')
