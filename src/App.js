import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [color, setColor] = useState('black');
  const [pixels, setPixels] = useState(Array(400).fill('white'));
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [undoStack, setUndoStack] = useState([]);

  const canvasRef = useRef(null);

  const changeColor = (newColor) => {
    setColor(newColor);
  };

  const colorPixel = (index) => {
    const newPixels = [...pixels];
    newPixels[index] = color;
    setPixels(newPixels);
  };

  const handleMouseDown = (index) => {
    const newUndoStack = [...undoStack];
    newUndoStack.push([...pixels]);
    setUndoStack(newUndoStack);

    setIsMouseDown(true);
    colorPixel(index);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseOver = (index) => {
    if (isMouseDown) {
      colorPixel(index);
    }
  };

  const clearCanvas = () => {
    setPixels(Array(400).fill('white'));
    setUndoStack([]);
  };

  const undoAction = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack.pop();
      setPixels(previousState);
      setUndoStack([...undoStack]);
    }
  };

  return (
    <div className="App">
      <div className="palette">
        {[
          'black',
          'red',
          'orange',
          'yellow',
          'green',
          'blue',
          'indigo',
          'violet',
          'white',
          'gray',
          'brown',
          'pink',
          'cyan',
          'lime',
          'purple',
          'teal',
          'magenta',
          'olive',
        ].map((paletteColor) => (
          <div
            key={paletteColor}
            className="color"
            style={{ backgroundColor: paletteColor }}
            onClick={() => changeColor(paletteColor)}
          />
        ))}
      </div>
      <div className="canvas" onMouseUp={handleMouseUp} ref={canvasRef}>
        {pixels.map((pixelColor, i) => (
          <div
            key={i}
            className="pixel"
            style={{ backgroundColor: pixelColor }}
            onClick={() => colorPixel(i)}
            onMouseDown={() => handleMouseDown(i)}
            onMouseOver={() => handleMouseOver(i)}
          />
        ))}
      </div>
      <div className="buttons">
        <button onClick={clearCanvas}>Limpar</button>
        <button onClick={undoAction}>Desfazer</button>
      </div>
    </div>
  );
}

export default App;
