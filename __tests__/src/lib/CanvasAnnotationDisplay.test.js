import CanvasAnnotationDisplay from '../../../src/lib/CanvasAnnotationDisplay';
import AnnotationResource from '../../../src/lib/AnnotationResource';
import dualStrategyAnno from '../../fixtures/version-2/annotationMiradorDual.json';

/** */
function createSubject(args) {
  return new CanvasAnnotationDisplay({
    color: 'blue',
    offset: {
      x: -100,
      y: 0,
    },
    zoomRatio: 0.5,
    ...args,
  });
}

describe('CanvasAnnotationDisplay', () => {
  describe('toContext', () => {
    it('selects svgSelector if present in a dual anno', () => {
      const context = {
        stroke: jest.fn(),
      };
      const subject = createSubject({
        resource: new AnnotationResource(dualStrategyAnno),
      });
      subject.svgContext = jest.fn();
      subject.fragmentContext = jest.fn();
      subject.toContext(context);
      expect(subject.svgContext).toHaveBeenCalled();
      expect(subject.fragmentContext).not.toHaveBeenCalled();
    });
    it('selects fragmentSelector if no svg present', () => {
      const context = {
        stroke: jest.fn(),
      };
      const subject = createSubject({
        resource: new AnnotationResource({ on: 'www.example.com/#xywh=10,10,100,200' }),
      });
      subject.svgContext = jest.fn();
      subject.fragmentContext = jest.fn();
      subject.toContext(context);
      expect(subject.svgContext).not.toHaveBeenCalled();
      expect(subject.fragmentContext).toHaveBeenCalled();
    });
  });
  describe('svgString', () => {
    it('selects the svg selector string value', () => {
      const subject = createSubject({
        resource: new AnnotationResource(dualStrategyAnno),
      });
      expect(subject.svgString).toMatch(/<svg/);
    });
  });
  describe('svgContext', () => {
    it('draws the paths with selected arguments', () => {
      const context = {
        fill: jest.fn(),
        restore: jest.fn(),
        save: jest.fn(),
        setLineDash: jest.fn(),
        stroke: jest.fn(),
        translate: jest.fn(),
      };
      const subject = createSubject({
        resource: new AnnotationResource(dualStrategyAnno),
      });
      subject.context = context;
      subject.svgContext();
      expect(context.stroke).toHaveBeenCalledWith({});
      expect(context.save).toHaveBeenCalledWith();
      expect(context.restore).toHaveBeenCalledWith();
      expect(context.translate).toHaveBeenCalledWith(-100, 0);
      expect(context.strokeStyle).toEqual('#00bfff');
      expect(context.lineWidth).toEqual(61.74334);
      expect(context.fill).toHaveBeenCalled();
    });
    it('resets the color if selected rather than using the SVG color', () => {
      const context = {
        fill: jest.fn(),
        restore: jest.fn(),
        save: jest.fn(),
        setLineDash: jest.fn(),
        stroke: jest.fn(),
        translate: jest.fn(),
      };
      const subject = createSubject({
        resource: new AnnotationResource(dualStrategyAnno),
        selected: true,
      });
      subject.context = context;
      subject.svgContext();
      expect(subject.context.strokeStyle).toBe('blue');
    });
  });
  describe('fragmentContext', () => {
    it('draws the fragment with selected arguments', () => {
      const context = {
        strokeRect: jest.fn(),
      };
      const subject = createSubject({
        resource: new AnnotationResource({ on: 'www.example.com/#xywh=10,10,100,200' }),
      });
      subject.context = context;
      subject.fragmentContext();
      expect(context.strokeRect).toHaveBeenCalledWith(-90, 10, 100, 200);
      expect(context.strokeStyle).toEqual('blue');
      expect(context.lineWidth).toEqual(2);
    });
  });
});
