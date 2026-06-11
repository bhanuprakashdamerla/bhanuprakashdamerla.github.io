import WindowControls from '#components/WindowControls.jsx'
import WindowWrapper from '#hoc/WindowWrapper.jsx'

const ImgFile = ({ data, ...props }) => {
  return (
    <section id="imgfile" {...props}>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <p>{data?.name ?? 'Image'}</p>
      </div>

      <div className="preview">
        <img src={data?.imageUrl} alt={data?.name ?? 'preview'} />
      </div>
    </section>
  )
}

export default WindowWrapper(ImgFile, 'imgfile')
