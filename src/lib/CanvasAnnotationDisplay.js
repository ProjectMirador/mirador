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
    if (this.resource.svgSelector) {
      this.svgContext(context);
    } else {
      this.fragmentContext(context);
    }
  }

  /** */
  get svgString() {
    return this.resource.svgSelector.value;
  }

  /** */
  svgContext(context) {
    [...this.svgPaths].forEach((element) => {
      /**
       *  Note: Path2D is not supported in IE11.
       *  TODO: Support multi canvas offset
       *  One example: https://developer.mozilla.org/en-US/docs/Web/API/Path2D/addPath
       */
      context.save();
      context.translate(this.offset.x, this.offset.y);
      const p = new Path2D(element.attributes.d.nodeValue);
      /**
       * Note: we could do something to return the svg styling attributes as
       * some have encoded information in these values. However, how should we
       * handle highlighting and other complications?
       *  context.strokeStyle = element.attributes.stroke.nodeValue;
       *  context.lineWidth = element.attributes['stroke-width'].nodeValue;
       */
      this.setupLineDash(context, element.attributes);
      context.strokeStyle = this.strokeColor( // eslint-disable-line no-param-reassign
        element.attributes,
      );
      context.lineWidth = this.lineWidth( // eslint-disable-line no-param-reassign
        element.attributes,
      );
      context.stroke(p);
      context.restore();
    });
  }

  /* eslint-disable  require-jsdoc, class-methods-use-this */
  setupLineDash(context, elementAttributes) {
    // stroke-dasharray
    if (elementAttributes['stroke-dasharray']) {
      context.setLineDash(elementAttributes['stroke-dasharray'].nodeValue.split(','));
    }
  }
  /* eslint-enable  require-jsdoc, class-methods-use-this */

  /** */
  fragmentContext(context) {
    const fragment = this.resource.fragmentSelector;
    fragment[0] += this.offset.x;
    fragment[1] += this.offset.y;
    context.strokeStyle = this.color; // eslint-disable-line no-param-reassign
    context.lineWidth = this.lineWidth(); // eslint-disable-line no-param-reassign
    context.strokeRect(...fragment);
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
