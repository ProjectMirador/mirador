export function buildPath2D(element) {
  const tag = element.tagName.toLowerCase();
  const num = (attr) => parseFloat(element.getAttribute(attr)) || 0;

  if (tag === 'path') return new Path2D(element.getAttribute('d'));

  const path = new Path2D();
  SHAPE_BUILDERS[tag]?.(path, element, num);
  return path;
}

const SHAPE_BUILDERS = {
  circle: (path, el, num) => {
    path.arc(num('cx'), num('cy'), num('r'), 0, 2 * Math.PI);
  },
  ellipse: (path, el, num) => {
    path.ellipse(num('cx'), num('cy'), num('rx'), num('ry'), 0, 0, 2 * Math.PI);
  },
  rect: (path, el, num) => {
    path.rect(num('x'), num('y'), num('width'), num('height'));
  },
  line: (path, el, num) => {
    path.moveTo(num('x1'), num('y1'));
    path.lineTo(num('x2'), num('y2'));
  },
  polygon: (path, el) => pointElementPath(path, el, true),
  polyline: (path, el) => pointElementPath(path, el, false),
};

function pointElementPath(path, element, closed) {
  const points = parsePoints(element.getAttribute('points'));
  points.forEach(([x, y], i) => {
    if (i === 0) path.moveTo(x, y);
    else path.lineTo(x, y);
  });
  if (closed) path.closePath();
}

function parsePoints(points) {
  const nums = points
    .trim()
    .split(/[\s,]+/)
    .map(Number);
  const pointsList = [];
  for (let i = 0; i < nums.length - 1; i += 2) {
    pointsList.push([nums[i], nums[i + 1]]);
  }
  return pointsList;
}
