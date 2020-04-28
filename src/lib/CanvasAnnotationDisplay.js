/**
 * CanvasAnnotationDisplay - class used to display a SVG and fragment based
 * annotations.
 */
export default class CanvasAnnotationDisplay {
  /** */
  constructor({
    resource, color, zoom, offset, width,
  }) {
    this.resource = resource;
    this.color = color;
    this.zoom = zoom;
    this.offset = offset;
    this.width = width || 1000;
  }

  /** */
  toContext(context) {
    this.context = context;
    if (this.resource.svgSelector) {
      this.svgContext();
    } else {
      this.fragmentContext();
    }
  }

  /** */
  get svgString() {
    return this.resource.svgSelector.value;
  }

  /** */
  svgContext() {
    [...this.svgPaths].forEach((element) => {
      /**
       *  Note: Path2D is not supported in IE11.
       *  TODO: Support multi canvas offset
       *  One example: https://developer.mozilla.org/en-US/docs/Web/API/Path2D/addPath
       */
      this.context.save();
      this.context.translate(this.offset.x, this.offset.y);
      const p = new Path2D(element.attributes.d.nodeValue);

      // Setup styling from SVG -> Canvas
      this.context.strokeStyle = this.color;
      if (element.attributes['stroke-dasharray']) {
        this.context.setLineDash(element.attributes['stroke-dasharray'].nodeValue.split(','));
      }
      const svgToCanvasMap = {
        fill: 'fillStyle',
        stroke: 'strokeStyle',
        'stroke-dashoffset': 'lineDashOffset',
        'stroke-linecap': 'lineCap',
        'stroke-linejoin': 'lineJoin',
        'stroke-miterlimit': 'miterlimit',
      };
      Object.keys(svgToCanvasMap).forEach((key) => {
        if (element.attributes[key]) {
          this.context[svgToCanvasMap[key]] = element.attributes[key].nodeValue;
        }
      });

      this.context.lineWidth = this.lineWidth( // eslint-disable-line no-param-reassign
        element.attributes,
      );
      this.context.stroke(p);

      // Wait to set the fill, so we can adjust the globalAlpha value if we need to
      if (element.attributes.fill && element.attributes.fill.nodeValue !== 'none') {
        if (element.attributes['fill-opacity']) {
          this.context.globalAlpha = element.attributes['fill-opacity'].nodeValue;
        }
        this.context.fill(p);
      }
      this.context.restore();
    });
  }

  /** */
  fragmentContext() {
    const fragment = this.resource.fragmentSelector;
    fragment[0] += this.offset.x;
    fragment[1] += this.offset.y;
    this.context.strokeStyle = this.color; // eslint-disable-line no-param-reassign
    this.context.lineWidth = this.lineWidth(); // eslint-disable-line no-param-reassign
    this.context.strokeRect(...fragment);
  }

  /** */
  lineWidth(elementAttributes) {
    console.log(this.zoom, this.width);
    let calculatedWidth = Math.ceil(10 / (this.zoom * this.width));
    if (elementAttributes && elementAttributes['stroke-width']) {
      calculatedWidth *= elementAttributes['stroke-width'].nodeValue;
    }
    return calculatedWidth;
  }

  /** */
  get svgPaths() {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(this.svgString, 'text/xml');
    return xmlDoc.getElementsByTagName('path');
  }
}
