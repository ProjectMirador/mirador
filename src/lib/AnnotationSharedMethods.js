export function parsedFragment(match, canvas) {
  if (!match) return null;
  const [x, y, width, height] = match[1]
    .replace('percent:', '')
    .split(',')
    .map((str) => parseFloat(str, 10));
  if (!match[1].includes('percent')) return [x, y, width, height];
  const canvasHeight = canvas.getHeight();
  const canvasWidth = canvas.getWidth();
  return [(x / 100) * canvasWidth, (y / 100) * canvasHeight, (width / 100) * canvasWidth, (height / 100) * canvasHeight];
}
