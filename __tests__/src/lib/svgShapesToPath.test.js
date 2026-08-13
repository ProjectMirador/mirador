import { buildPath2D } from '../../../src/lib/svgShapesToPath';

/** Creates an <svg> element and parses innerHTML into real SVG children. */
function svgToElement(innerHTML) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  el.innerHTML = innerHTML;
  return el.firstElementChild;
}

describe('svgShapesToPath', () => {
  describe('buildPath2D', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    describe('path', () => {
      it('builds a Path2D directly from the d attribute', () => {
        const Path2DSpy = vi.spyOn(globalThis, 'Path2D');

        const result = buildPath2D(svgToElement("<path d='M0,0 L10,10 Z' />"));

        expect(Path2DSpy).toHaveBeenCalledWith('M0,0 L10,10 Z');
        expect(result).toBeInstanceOf(Path2D);
      });
    });

    describe('circle', () => {
      it('draws an arc using cx, cy, and r', () => {
        const arcSpy = vi.spyOn(Path2D.prototype, 'arc');

        buildPath2D(svgToElement("<circle cx='10' cy='20' r='5' />"));

        expect(arcSpy).toHaveBeenCalledWith(10, 20, 5, 0, 2 * Math.PI);
      });
    });

    describe('circle with no attributes', () => {
      it('defaults missing numeric attributes to 0', () => {
        const arcSpy = vi.spyOn(Path2D.prototype, 'arc');

        buildPath2D(svgToElement('<circle />'));

        expect(arcSpy).toHaveBeenCalledWith(0, 0, 0, 0, 2 * Math.PI);
      });
    });

    describe('ellipse', () => {
      it('draws an ellipse using cx, cy, rx, and ry', () => {
        const ellipseSpy = vi.spyOn(Path2D.prototype, 'ellipse');

        buildPath2D(svgToElement("<ellipse cx='10' cy='20' rx='5' ry='8' />"));

        expect(ellipseSpy).toHaveBeenCalledWith(10, 20, 5, 8, 0, 0, 2 * Math.PI);
      });
    });

    describe('rect', () => {
      it('draws a rect using x, y, width, and height', () => {
        const rectSpy = vi.spyOn(Path2D.prototype, 'rect');

        buildPath2D(svgToElement("<rect x='1' y='2' width='30' height='40' />"));

        expect(rectSpy).toHaveBeenCalledWith(1, 2, 30, 40);
      });
    });

    describe('line', () => {
      it('moves to the start point and draws a line to the end point', () => {
        const moveToSpy = vi.spyOn(Path2D.prototype, 'moveTo');
        const lineToSpy = vi.spyOn(Path2D.prototype, 'lineTo');

        buildPath2D(svgToElement("<line x1='0' y1='0' x2='100' y2='50' />"));

        expect(moveToSpy).toHaveBeenCalledWith(0, 0);
        expect(lineToSpy).toHaveBeenCalledWith(100, 50);
      });
    });

    describe('polygon', () => {
      it('moves to the first point, lines to the rest, and closes the path', () => {
        const moveToSpy = vi.spyOn(Path2D.prototype, 'moveTo');
        const lineToSpy = vi.spyOn(Path2D.prototype, 'lineTo');
        const closePathSpy = vi.spyOn(Path2D.prototype, 'closePath');

        buildPath2D(svgToElement("<polygon points='0,0 10,0 5,10' />"));

        expect(moveToSpy).toHaveBeenCalledWith(0, 0);
        expect(lineToSpy).toHaveBeenNthCalledWith(1, 10, 0);
        expect(lineToSpy).toHaveBeenNthCalledWith(2, 5, 10);
        expect(closePathSpy).toHaveBeenCalled();
      });
    });

    describe('polygon with whitespace-separated points', () => {
      it('parses points the same as comma-separated', () => {
        const lineToSpy = vi.spyOn(Path2D.prototype, 'lineTo');

        buildPath2D(svgToElement("<polygon points='0 0 10 0 5 10' />"));

        expect(lineToSpy).toHaveBeenNthCalledWith(1, 10, 0);
        expect(lineToSpy).toHaveBeenNthCalledWith(2, 5, 10);
      });
    });

    describe('polyline', () => {
      it('moves to the first point and lines to the rest, without closing', () => {
        const moveToSpy = vi.spyOn(Path2D.prototype, 'moveTo');
        const lineToSpy = vi.spyOn(Path2D.prototype, 'lineTo');
        const closePathSpy = vi.spyOn(Path2D.prototype, 'closePath');

        buildPath2D(svgToElement("<polyline points='0,0 10,0 5,10' />"));

        expect(moveToSpy).toHaveBeenCalledWith(0, 0);
        expect(lineToSpy).toHaveBeenNthCalledWith(1, 10, 0);
        expect(lineToSpy).toHaveBeenNthCalledWith(2, 5, 10);
        expect(closePathSpy).not.toHaveBeenCalled();
      });
    });

    describe('polygon with no points attribute', () => {
      it('throws, since points is required for a valid polygon', () => {
        expect(() => buildPath2D(svgToElement('<polygon />'))).toThrow();
      });
    });

    describe('polyline with no points attribute', () => {
      it('throws, since points is required for a valid polyline', () => {
        expect(() => buildPath2D(svgToElement('<polyline />'))).toThrow();
      });
    });
  });
});
