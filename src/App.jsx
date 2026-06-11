import { Dock, Navbar, Welcome } from '#components'
import {
  Contact,
  Finder,
  ImgFile,
  Photos,
  Safari,
  Terminal,
  TxtFile,
} from '#windows'

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />

      <Finder />
      <Safari />
      <Terminal />
      <Contact />
      <Photos />
      <TxtFile />
      <ImgFile />

      <Dock />
    </main>
  )
}

export default App
