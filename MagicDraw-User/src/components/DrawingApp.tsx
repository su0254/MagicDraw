import CanvasDraw from 'react-canvas-draw';

const DrawingApp = () => {
  return (
    <div>
      <CanvasDraw
        brushColor={"#000"}
        brushRadius={5}
        lazyRadius={0}
        style={{ border: '1px solid black' }}
      />
    </div>
  );
};

export default DrawingApp;