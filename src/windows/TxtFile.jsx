import WindowControls from '#components/WindowControls.jsx'
import WindowWrapper from '#hoc/WindowWrapper.jsx'

const TxtFile = ({ data, ...props }) => {
  return (
    <section id="txtfile" {...props}>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{data?.name ?? 'Untitled.txt'}</h2>
      </div>

      <div className="p-5 space-y-3 max-h-[60vh] overflow-y-auto">
        {data?.subtitle && (
          <h3 className="font-semibold text-gray-800">{data.subtitle}</h3>
        )}
        {data?.image && (
          <img
            src={data.image}
            alt={data.name}
            className="w-full rounded-md object-cover"
          />
        )}
        {data?.description?.map((paragraph, index) => (
          <p key={index} className="text-sm text-gray-700">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}

export default WindowWrapper(TxtFile, 'txtfile')
