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
      /**
       * Note: we could do something to return the svg styling attributes as
       * some have encoded information in these values. However, how should we
       * handle highlighting and other complications?
       *  context.strokeStyle = element.attributes.stroke.nodeValue;
       *  context.lineWidth = element.attributes['stroke-width'].nodeValue;
       */
      this.setupLineDash(element.attributes);
      this.context.strokeStyle = this.strokeColor( // eslint-disable-line no-param-reassign
        element.attributes,
      );
      this.context.lineWidth = this.lineWidth( // eslint-disable-line no-param-reassign
        element.attributes,
      );
      this.context.stroke(p);
      this.context.restore();
    });
  }

  /** */
  setupLineDash(elementAttributes) {
    // stroke-dasharray
    if (elementAttributes['stroke-dasharray']) {
      this.context.setLineDash(elementAttributes['stroke-dasharray'].nodeValue.split(','));
    }
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
  strokeColor(elementAttributes) {
    if (elementAttributes && elementAttributes.stroke) {
      return elementAttributes.stroke.nodeValue;
    }
    return this.color;
  }

  /** */
  lineWidth(elementAttributes) {
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
