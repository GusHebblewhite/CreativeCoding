const canvasSketch = require('canvas-sketch');

let manager;

const settings = {
  dimensions: [ 1080, 1080 ]
};

//Create canvas to read bitmap from 
const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

let text = "A";

const sketch = ({ context, width, height }) => {

  const cell = 20; //Size of "pixels"
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  //Create crude canvas to sample pixels from
  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);

    const fontSize = 64;
    const fontStyle = "monospace"

    typeContext.fillStyle = "white";
    typeContext.font = `${fontSize}px ${fontStyle}`;
    typeContext.textBaseline = "top"
    //^ https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline

    //create text object
    const textInfo = typeContext.measureText(text);

    //Center character using bounding box information
    //Top left corners of bounding box
    const xBB = textInfo.actualBoundingBoxLeft * -1;
    const yBB = textInfo.actualBoundingBoxAscent * -1;
    //Bounding box dimensions
    const wBB = textInfo.actualBoundingBoxRight - xBB;
    const hBB = textInfo.actualBoundingBoxDescent - yBB;
    //Perform centering
    const xTranslate = (cols - wBB) * 0.5 - xBB;
    const yTranslate = (rows - hBB) * 0.5 - yBB;
 
    /*
    //Draw bounding box
    typeContext.beginPath()
    typeContext.rect(xBB, yBB, wBB, hBB);
    typeContext.stroke();
    */

    typeContext.save();
    typeContext.translate(xTranslate, yTranslate);
    typeContext.fillText(text, 0, 0);
    typeContext.restore();

    //context.drawImage(typeCanvas, 0, 0);

    //Get base image
    const base = typeContext.getImageData(0, 0, cols, rows).data;

    console.log(base)

    //Iterate through bitmap
    for (let i=0; i<numCells; i++){
      const xCell = i%cols;
      const yCell = Math.floor(i/cols)

      //Get colour

      const r = base[i*4]
      const g = base[i*4 + 1]
      const b = base[i*4 + 2] 

      xMainCanvas = xCell * cell;
      yMainCanvas = yCell * cell;

      context.save()
      context.translate(xMainCanvas, yMainCanvas)
      console.log(xMainCanvas);
      context.translate(cell/2, cell/2)
      context.fillStyle = `rgb(${r}, ${g}, ${b})`
      context.beginPath()
      context.arc(0, 0, cell/2, 0, 2*Math.PI);
      context.fill()

      context.restore()

    }

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
