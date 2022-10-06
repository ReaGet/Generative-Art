import {getRandColor} from '../utils.js';

document.body.style['background-color'] = getRandColor();

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const size = 360;
const dpr = window.devicePixelRatio;
const step = 10;
const lines = [];

canvas.width = size * dpr;
canvas.height = size * dpr;
ctx.scale(dpr, dpr);

ctx.lineCap = 'square';
ctx.lineWidth = 2;
ctx.strokeStyle = "#fff";

for (let i = step; i <= size - step; i += step) {
  let line = [];
  for (let j = step; j <= size - step; j += step) {
    const distanceToCenter = Math.abs(j - size / 2);
    const variance = Math.max(size / 2 - 50 - distanceToCenter, 0);
    const random = Math.random() * variance / 2 * -1;
    let point = {
      x: j,
      y: i + random,
      cy: i + random,
      c: 0,
      vy: Math.random() * 1.5 - 0.5,
    };
    line.push(point);
  }
  lines.push(line);
}

function draw() {
  ctx.clearRect(0, 0, size, size);
  for (let i = 5; i < lines.length; i++) {
    ctx.beginPath();
    ctx.moveTo(lines[i][0].x, lines[i][0].y)
    for (let j = 0; j < lines[i].length - 2; j++) {
      // ctx.lineTo(lines[i][j].x, lines[i][j].y);
      const xc = (lines[i][j].x + lines[i][j + 1].x) / 2;
      const yc = (lines[i][j].y + lines[i][j + 1].y) / 2;
      ctx.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc);
    }
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fill();
    ctx.restore();
    ctx.stroke();
  }
}

function update() {
  for (let i = 5; i < lines.length; i++) {
    for (let j = 5; j < lines[i].length - 5; j++) {
      lines[i][j].c -= lines[i][j].vy;
      lines[i][j].y = lines[i][j].cy += Math.sin(lines[i][j].c) / 3;
      // lines[i][j].x -= 0.1;
      // lines[i][j].vy = Math.random() * 1.5 - 0.5;
      // lines[i][j].y += lines[i][j].vy;
    }
  }
}

setInterval(() => {
  update();
  draw();
}, 1000 / 30);
