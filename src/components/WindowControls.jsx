import useWindowStore from '#store/window.js';

const WindowControls = ({ target }) => {
  const { closeWindow } = useWindowStore();

  return (
    <div id="window-controls">
      <button
        type="button"
        className="close"
        aria-label={`Close ${target} window`}
        onClick={() => closeWindow(target)}
      />
      <button type="button" className="minimize" aria-label="Minimize window" />
      <button type="button" className="maximize" aria-label="Maximize window" />
    </div>
  );
};

export default WindowControls;
