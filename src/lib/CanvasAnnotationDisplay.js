/**
 * CanvasAnnotationDisplay - class used to display a SVG and fragment based
 * annotations.
 */
import { buildPath2D } from '../lib/svgShapesToPath';

export default class CanvasAnnotationDisplay {
  /** */
  constructor({ resource, palette, zoomRatio, offset, selected, hovered }) {
    this.resource = resource;
    this.palette = palette;
    this.zoomRatio = zoomRatio;
    this.offset = offset;
    this.selected = selected;
    this.hovered = hovered;
  }

  /** */
  toContext(context) {
    this.context = context;
    if (this.resource.svgSelector) {
      this.svgContext();
    } else if (this.resource.fragmentSelector) {
      this.fragmentContext();
    }
  }

  /** */
  get svgString() {
    return this.resource.svgSelector.value;
  }

  parseOpacity(value) {
    if (typeof value === 'string' && value.trim().endsWith('%')) {
      return parseFloat(value) / 100;
    }
    return parseFloat(value);
  }

  /** */
  svgContext() {
    let currentPalette;
    if (this.hovered) {
      currentPalette = this.palette.hovered;
    } else if (this.selected) {
      currentPalette = this.palette.selected;
    } else {
      currentPalette = this.palette.default;
    }

    if (currentPalette.globalAlpha === 0) return;

    [...this.svgPaths].forEach((element) => {
      /**
       *  Note: Path2D is not supported in IE11.
       *  TODO: Support multi canvas offset
       *  One example: https://developer.mozilla.org/en-US/docs/Web/API/Path2D/addPath
       */
      this.context.save();
      this.context.translate(this.offset.x, this.offset.y);
      const p = buildPath2D(element);

      // Setup styling from SVG -> Canvas
      this.context.strokeStyle = this.color;
      if (element.getAttribute('stroke-dasharray')) {
        this.context.setLineDash(element.getAttribute('stroke-dasharray').split(','));
      }
      const svgToCanvasMap = {
        fill: 'fillStyle',
        stroke: 'strokeStyle',
        'stroke-dashoffset': 'lineDashOffset',
        'stroke-linecap': 'lineCap',
        'stroke-linejoin': 'lineJoin',
        'stroke-miterlimit': 'miterlimit',
        'stroke-width': 'lineWidth',
      };
      Object.keys(svgToCanvasMap).forEach((key) => {
        if (element.getAttribute(key)) {
          this.context[svgToCanvasMap[key]] = element.getAttribute(key);
        }
      });

      // Resize the stroke based off of the zoomRatio (currentZoom / maxZoom)
      this.context.lineWidth /= this.zoomRatio;

      // Reset the color if it is selected or hovered on
      if (this.selected || this.hovered) {
        this.context.strokeStyle = currentPalette.strokeStyle || currentPalette.fillStyle;
      }

      this.context.globalAlpha = currentPalette.globalAlpha;
      // Set the globalAlpha for fill, draw the fill and then update the globalAlpha for stroke
      if (element.getAttribute('fill') && element.getAttribute('fill') !== 'none') {
        if (element.getAttribute('fill-opacity')) {
          this.context.globalAlpha = currentPalette.globalAlpha * this.parseOpacity(element.getAttribute('fill-opacity'));
        }
        this.context.fill(p);
      }

      if (element.getAttribute('stroke-opacity')) {
        this.context.globalAlpha = currentPalette.globalAlpha * this.parseOpacity(element.getAttribute('stroke-opacity'));
      } else {
        this.context.globalAlpha = currentPalette.globalAlpha;
      }
      this.context.stroke(p);
      this.context.restore();
    });
  }

  /** */
  fragmentContext() {
    const fragment = this.resource.fragmentSelector;
    fragment[0] += this.offset.x;
    fragment[1] += this.offset.y;

    let currentPalette;
    if (this.selected) {
      currentPalette = this.palette.selected;
    } else if (this.hovered) {
      currentPalette = this.palette.hovered;
    } else {
      currentPalette = this.palette.default;
    }

    this.context.save();
    Object.keys(currentPalette).forEach((key) => {
      this.context[key] = currentPalette[key];
    });

    if (currentPalette.globalAlpha === 0) return;

    if (currentPalette.fillStyle) {
      this.context.fillRect(...fragment);
    } else {
      this.context.lineWidth = 1 / this.zoomRatio;
      this.context.strokeRect(...fragment);
    }

    this.context.restore();
  }

  /** */
  get svgPaths() {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(this.svgString, 'text/xml');
    return Array.from(xmlDoc.querySelectorAll('circle, ellipse, rect, line, polygon, polyline, path'));
  }
}
