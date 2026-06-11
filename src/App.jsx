import {Welcome, Navbar, Dock} from "#components"
import {Finder, Safari, Terminal, Contact, Photos, TxtFile, ImgFile} from "#windows"

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