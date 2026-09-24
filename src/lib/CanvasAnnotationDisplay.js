/**
 * CanvasAnnotationDisplay - class used to display a SVG and fragment based
 * annotations.
 */
import { buildPath2D } from '../lib/svgShapesToPath';

export default class CanvasAnnotationDisplay {
  /** */
  constructor({ resource, palette, canvasWorld, overlayScale, selected, hovered, zoomRatio, offset }) {
    this.resource = resource;
    this.palette = palette;
    this.canvasWorld = canvasWorld;
    this.selected = selected;
    this.hovered = hovered;
    this.overlayScale = overlayScale;
    // these variables have to be kept for plugins
    this.zoomRatio = zoomRatio;
    this.offset = offset || this.canvasWorld.offsetByCanvas(this.resource.targetId);
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

  /**
   * Two scale factors compose here: `overlayScale` (screen pixels per OSD
   * viewport unit -- already applied to the context by
   * OpenSeadragonCanvasOverlay before toContext() runs) and `scale`
   * (native image pixels per CanvasWorld unit -- applied explicitly below
   * via context.scale()). Both apply automatically to drawn geometry, but
   * not to a plain lineWidth number -- lineWidthScale pre-divides that
   * back out so strokes render at their native width.
   */
  get lineWidthScale() {
    return this.scale * this.overlayScale;
  }

  /** Native image pixels -> CanvasWorld world units, for this canvas. */
  get scale() {
    return this.canvasWorld.canvasScale(this.resource.targetId);
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
      this.context.scale(this.scale, this.scale);
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

      // Resize the stroke based off of the canvasScale * overlayScale
      this.context.lineWidth /= this.lineWidthScale;

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
    this.context.translate(this.offset.x, this.offset.y);
    this.context.scale(this.scale, this.scale);

    if (currentPalette.fillStyle) {
      this.context.fillRect(...fragment);
    } else {
      this.context.lineWidth = 1 / this.lineWidthScale;
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
