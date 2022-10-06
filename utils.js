export function getRandColor(rMax = 255, gMax = 255, bMax = 255) {
  const r = getRandBetween(0, rMax);
  const g = getRandBetween(0, gMax);
  const b = getRandBetween(0, bMax);

  return `rgb(${r}, ${g}, ${b})`;
}

export function getRandBetween(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}