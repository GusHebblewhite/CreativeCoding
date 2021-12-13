const canvasSketch = require('canvas-sketch');

let manager;

const settings = {
  dimensions: [ 1080, 1080 ]
};

let text = "A";

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const fontSize = 1200;
    const fontStyle = "monospace"

    context.fillStyle = "black";
    context.font = `${fontSize}px ${fontStyle}`;
    context.textBaseline = "top"
    //^ https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline

    //create text object
    const textInfo = context.measureText(text);

    //Center character using bounding box information
    //Top left corners of bounding box
    const xBB = textInfo.actualBoundingBoxLeft * -1;
    const yBB = textInfo.actualBoundingBoxAscent * -1;
    //Bounding box dimensions
    const wBB = textInfo.actualBoundingBoxRight - xBB;
    const hBB = textInfo.actualBoundingBoxDescent - yBB;
    //Perform centering
    const xTranslate = (width - wBB) * 0.5 - xBB;
    const yTranslate = (height - hBB) * 0.5 - yBB;

    /*
    //Draw bounding box
    context.beginPath()
    context.rect(xBB, yBB, wBB, hBB);
    context.stroke();
    */

    context.save();
    context.translate(xTranslate, yTranslate);
    context.fillText(text, 0, 0);
    context.restore();

  };
};

const start = async () => {
  manager = await canvasSketch(sketch, settings);
};

start();

const onKeyUp = (e) => {
  text = e.key.toUpperCase();
  manager.render()
}

document.addEventListener("keypress", onKeyUp);
