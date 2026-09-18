import CanvasAnnotationDisplay from '../../../src/lib/CanvasAnnotationDisplay';
import AnnotationResource from '../../../src/lib/AnnotationResource';
import dualStrategyAnno from '../../fixtures/version-2/annotationMiradorDual.json';

/** */
function createSubject(args) {
  return new CanvasAnnotationDisplay({
    offset: {
      x: -100,
      y: 0,
    },
    palette: {
      default: { globalAlpha: 1, strokeStyle: 'black' },
      hovered: { globalAlpha: 1, strokeStyle: 'blue' },
      selected: { globalAlpha: 1, strokeStyle: 'yellow' },
    },
    zoomRatio: 0.5,
    ...args,
  });
}

function createMockContext(onFill = '') {
  return {
    fill: vi.fn(onFill),
    restore: vi.fn(),
    save: vi.fn(),
    setLineDash: vi.fn(),
    stroke: vi.fn(),
    strokeRect: vi.fn(),
    translate: vi.fn(),
  };
}

describe('CanvasAnnotationDisplay', () => {
  describe('toContext', () => {
    it('selects svgSelector if present in a dual anno', () => {
      const subject = createSubject({
        resource: new AnnotationResource(dualStrategyAnno),
      });
      subject.svgContext = vi.fn();
      subject.fragmentContext = vi.fn();
      subject.toContext(createMockContext());
      expect(subject.svgContext).toHaveBeenCalled();
      expect(subject.fragmentContext).not.toHaveBeenCalled();
    });

    it('draws every shape and sets all 6 svg shapes', () => {
      const context = createMockContext();
      const subject = createSubject({
        resource: new AnnotationResource({
          motivation: ['oa:commenting'],
          on: {
            selector: {
              item: {
                '@type': 'oa:SvgSelector',
                value: `<svg xmlns='http://www.w3.org/2000/svg'>
                <g>
                  <line x1='0' y1='0' x2='300' y2='200' stroke='red' />
                  <polygon points='242,633 340,552 948,1173 859,1249' />
                </g>
                <circle cx='1050' cy='250' r='90' />
                <ellipse cx='1050' cy='1650' rx='130' ry='80' />
                <rect x='50' y='1500' width='180' height='120' />
                <polyline points='60,300 200,220 340,340 480,260' />
              </svg>`,
              },
            },
          },
        }),
      });
      subject.context = context;

      const tags = [...subject.svgPaths].map((el) => el.tagName.toLowerCase());
      expect(tags).toEqual(['line', 'polygon', 'circle', 'ellipse', 'rect', 'polyline']);

      subject.svgContext = vi.fn();
      subject.fragmentContext = vi.fn();
      subject.toContext(context);
      expect(subject.svgContext).toHaveBeenCalled(6);
      expect(subject.fragmentContext).not.toHaveBeenCalled();
    });
    it('selects fragmentSelector if present and if no svg is present', () => {
      const subject = createSubject({
        resource: new AnnotationResource({ on: 'www.example.com/#xywh=10,10,100,200' }),
      });
      subject.svgContext = vi.fn();
      subject.fragmentContext = vi.fn();
      subject.toContext(createMockContext());
      expect(subject.svgContext).not.toHaveBeenCalled();
      expect(subject.fragmentContext).toHaveBeenCalled();
    });
    it('ignores annotations without selectors', () => {
      const subject = createSubject({
        resource: new AnnotationResource({ on: 'www.example.com' }),
      });
      subject.svgContext = vi.fn();
      subject.fragmentContext = vi.fn();
      subject.toContext(createMockContext());
      expect(subject.svgContext).not.toHaveBeenCalled();
      expect(subject.fragmentContext).not.toHaveBeenCalled();
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

  describe('svgString', () => {
    it('converts percentage strings to float decimal', () => {
      const subject = createSubject({});
      expect(subject.parseOpacity('30%')).toEqual(0.3);
    });

    it('converts decimals strings to float', () => {
      const subject = createSubject({});
      expect(subject.parseOpacity('.2')).toEqual(0.2);
    });
    it('parses numeric input directly', () => {
      const subject = createSubject({});
      expect(subject.parseOpacity(0.5)).toEqual(0.5);
    });
  });
  describe('svgContext', () => {
    it('draws the paths with selected arguments', () => {
      let alphaAtFill;
      const context = createMockContext(() => {
        alphaAtFill = context.globalAlpha;
      });

      const subject = createSubject({
        resource: new AnnotationResource(dualStrategyAnno),
      });
      subject.context = context;
      subject.svgContext();
      expect(context.save).toHaveBeenCalledWith();
      expect(context.restore).toHaveBeenCalledWith();
      expect(context.translate).toHaveBeenCalledWith(-100, 0);
      expect(context.strokeStyle).toEqual('#00bfff');
      expect(context.lineWidth).toEqual(61.74334);
      expect(context.setLineDash).toHaveBeenCalledWith(['4 1 2']);
      expect(context.fill).toHaveBeenCalled();
      expect(alphaAtFill).toEqual(0.2);
      expect(context.globalAlpha).toEqual(0.3);
    });

    it('skips dasharray, fill, and opacity overrides when attributes are absent', () => {
      const context = createMockContext();
      const subject = createSubject({
        resource: new AnnotationResource({
          motivation: ['oa:commenting'],
          on: {
            selector: {
              item: {
                '@type': 'oa:SvgSelector',
                value: "<svg xmlns='http://www.w3.org/2000/svg'><path d='M0,0 L10,10' stroke='#00bfff' stroke-width='2' /></svg>",
              },
            },
          },
        }),
      });
      subject.context = context;
      subject.svgContext();
      expect(context.setLineDash).not.toHaveBeenCalled();
      expect(context.fill).not.toHaveBeenCalled();
      expect(context.globalAlpha).toEqual(1);
    });

    it('uses default globalAlpha for fill when fill-opacity is not set', () => {
      let alphaAtFill;
      const context = createMockContext(() => {
        alphaAtFill = context.globalAlpha;
      });
      const subject = createSubject({
        resource: new AnnotationResource({
          motivation: ['oa:commenting'],
          on: {
            selector: {
              item: {
                '@type': 'oa:SvgSelector',
                value:
                  "<svg xmlns='http://www.w3.org/2000/svg'><path d='M0,0 L10,10' fill='#00bfff' stroke='#00bfff' stroke-width='2' /></svg>",
              },
            },
          },
        }),
      });
      subject.context = context;
      subject.svgContext();
      expect(alphaAtFill).toEqual(1);
    });
    it('resets the color if selected rather than using the SVG color', () => {
      const subject = createSubject({
        resource: new AnnotationResource(dualStrategyAnno),
        selected: true,
      });
      subject.context = createMockContext();
      subject.svgContext();
      expect(subject.context.strokeStyle).toBe('yellow');
    });
  });
  describe('fragmentContext', () => {
    it('draws the fragment with selected arguments', () => {
      let alphaAtFill;
      const context = createMockContext(() => {
        alphaAtFill = context.globalAlpha;
      });
      const subject = createSubject({
        hovered: true,
        resource: new AnnotationResource({ on: 'www.example.com/#xywh=10,10,100,200' }),
        viewportCanvas: {
          imageToViewportRectangle: vi.fn().mockReturnValue({ x: -90, y: 10, width: 100, height: 200 }),
        },
      });
      subject.context = context;
      subject.fragmentContext();
      expect(context.strokeRect).toHaveBeenCalledWith(-90, 10, 100, 200);
      expect(context.strokeStyle).toEqual('blue');
      expect(context.lineWidth).toEqual(2);
      expect(context.setLineDash).not.toHaveBeenCalled();
      expect(alphaAtFill).toEqual(undefined);
      expect(context.globalAlpha).toEqual(1);
    });
  });
});
