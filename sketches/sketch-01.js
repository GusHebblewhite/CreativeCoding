const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 600, 600 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    //Canvas
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    //Drawing
    const squareHeight = 60;
    const squareWidth = 60;
    const gap = 20;
    const n = 5;
    const pInner = 0.5
    const margin = 100;

    //context.lineWidth = 4;

    for (let j = 0; j<n; j++){
        for (let i = 0; i<n; i++){

            context.beginPath()
            let x1 = (squareWidth + gap) * i;
            let y1 = (squareHeight + gap) * j;
            context.rect(margin + x1, margin + y1, squareWidth, squareHeight);
            context.stroke();

            if (Math.random() < pInner){
                context.beginPath()
                context.rect(margin + x1 + 6, margin + y1 + 6, squareWidth - 12, squareHeight - 12);
                context.stroke();
            }
        }
    }
  };
};

canvasSketch(sketch, settings);
