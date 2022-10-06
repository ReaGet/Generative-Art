import {getRandColor} from '../utils.js';

document.body.style['background-color'] = getRandColor();

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const size = 360;
const dpr = window.devicePixelRatio;
const step = 20;

canvas.width = size * dpr;
canvas.height = size * dpr;
ctx.scale(dpr, dpr);

ctx.lineCap = 'square';
ctx.lineWidth = 2;
ctx.strokeStyle = "#fff";

function draw(x, y, width, height) {
  const leftToRight = Math.random() >= 0.5;

  if (leftToRight) {
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y + height);
  } else {
    ctx.moveTo(x + width, y);
    ctx.lineTo(x, y + height);
  }
  ctx.stroke();
}

for (let x = 0; x < size; x += step) {
  for (let y = 0; y < size; y += step) {
    draw(x, y, step, step);
  }
}
