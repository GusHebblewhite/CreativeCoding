const canvasSketch = require('canvas-sketch');
const csmath = require('canvas-sketch-util/math')
const csrandom = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    //Centre the context
    //context.translate(width * 0.5, height * 0.5);

    //All shapes are black by default
    context.fillStyle = 'black';


    // ## DraW clock ticks

    //Parameters
    const radius = width * 0.3;
    const nTicks = 30;
    const rectLengthMax = width * 0.7
    const rectWidthMax = 40
    pDropTick = 0.2;

    for (let i = 0; i < nTicks; i++){

      if (Math.random() < pDropTick) {
        continue
      }

      const rectWidth = rectWidthMax * csrandom.range(0.2, 1);
      const rectLength = rectLengthMax * csrandom.range(0.2, 1.2);

      context.save();

      //Rotate context
      context.rotate(i/nTicks * 2 * Math.PI);

      //create a narrow black rectangle
      context.beginPath();
      context.rect(0 - rectWidth * 0.5,  radius, rectWidth, rectLength);
      context.fill();
      context.restore();
    }

    // ## Draw cutout concentric circles

    //Params
    const nCircles = 30;
    const radiusRange = [radius, radius + rectLengthMax];  //Range for bands of circles
    const startRange = [0, Math.PI * 2];                       //Range to start circle drawing
    const circleTotRange = [0.1, 0.3];                       //Range for total fraction of circle to draw
    const lineThicknessRange = [4, 15];

    for (let j = 0; j < nCircles; j++){

      //fraction of circle to keep
      const circleFrac = csrandom.range(...circleTotRange);
      //start point
      const circleStart = csrandom.range(...startRange);
      //radius
      const circleRad = csrandom.range(...radiusRange);
      //Line Thickness
      const lineThickness = csrandom.rangeFloor(...lineThicknessRange);

      context.save()

      context.lineWidth = lineThickness;
      context.beginPath()
      context.arc(0, 0, circleRad, circleStart, circleStart + circleFrac * 2 * Math.PI)
      context.stroke()

      context.restore()
    }

  };
};

canvasSketch(sketch, settings);
