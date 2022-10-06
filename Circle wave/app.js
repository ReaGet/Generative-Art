import {getRandColor} from '../utils.js';

document.body.style['background-color'] = getRandColor(180, 180, 180);

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const size = (document.body.offsetWidth > document.body.offsetHeight ? document.body.offsetHeight : document.body.offsetWidth) - 30;
const dpr = window.devicePixelRatio;
const step = 5;
const dots = [];
const radius = size / 3;

canvas.width = size;
canvas.height = size;
// ctx.scale(dpr, dpr);

ctx.lineCap = 'square';
ctx.lineWidth = 1;
ctx.strokeStyle = "rgba(255, 255, 255, .1)";

for (let i = 0; i <= 360; i += step) {
  let radians = i * Math.PI / 180;
  let new_radius = radius + Math.random() * 15
  let x = Math.cos(radians) * new_radius,
      y = Math.sin(radians) * new_radius;
  
  const dot = {
    x: x + size / 2,
    y: y + size / 2,
    r: new_radius,
    cr: new_radius,
    s: Math.random() * 1,
    c: 0,
    deg: i,
  }

  dots.push(dot);
}

function draw() {
  // ctx.clearRect(0, 0, size, size);
  ctx.beginPath();
  ctx.moveTo(dots[0].x, dots[0].y);
  for (let i = 1; i < dots.length - 1; i++) {
    // ctx.lineTo(dots[i].x, dots[i].y);
    const xc = (dots[i].x + dots[i + 1].x) / 2;
    const yc = (dots[i].y + dots[i + 1].y) / 2;
    ctx.quadraticCurveTo(dots[i].x, dots[i].y, xc, yc);
  }
  ctx.closePath();
  ctx.stroke();
}

function drawNoise() {
  // ctx.clearRect(0, 0, size, size);
ctx.strokeStyle = "rgba(255, 255, 255, .07)";
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];
    const rand = Math.random() > 0.9;
    let r, x, y;
    if (rand) {
      r = dot.cr - (size / 10) + Math.random() * (size / 6); 
      x = Math.cos(dot.deg * Math.PI / 180) * r + size / 2,
      y = Math.sin(dot.deg * Math.PI / 180) * r + size / 2;
      ctx.beginPath();
      ctx.arc(x, y, 0.4, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

function update() {
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];
    dot.deg += 0.2;
    dot.c += dot.s;
    dot.r = dot.cr + Math.sin(dot.c * Math.PI / 180) * (size / 10); 
    dot.x = Math.cos(dot.deg * Math.PI / 180) * dot.r + size / 2,
    dot.y = Math.sin(dot.deg * Math.PI / 180) * dot.r + size / 2;
  }
}

for (let i = 0; i < 1000; i++) {
  update();
  drawNoise();
}

for (let i = 0; i < 500; i++) {
  update();
  draw();
}


// setInterval(() => {
//   update();
//   draw();
// }, 1000 / 60);
