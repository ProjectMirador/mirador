/**
 * CanvasAnnotationDisplay - class used to display a SVG and fragment based
 * annotations.
 */
import { buildPath2D } from '../lib/svgShapesToPath';

export default class CanvasAnnotationDisplay {
  /** */
  constructor({ resource, palette, zoomRatio, offset, selected, hovered, imageSource, canvasSize, draft = false }) {
    this.resource = resource;
    this.palette = palette;
    this.zoomRatio = zoomRatio;
    this.offset = offset;
    this.selected = selected;
    this.hovered = hovered;
    this.imageSource = imageSource;
    this.canvasSize = canvasSize;
    this.draft = draft;
  }

  /** Draft palette, when this annotation is a draft and the palette has one. */
  get draftPalette() {
    return this.draft && this.palette.draft ? this.palette.draft : null;
  }

  /** Applies a palette's dash pattern, scaled like the line width. */
  applyLineDash(currentPalette, scale = 1) {
    if (Array.isArray(currentPalette.lineDash) && this.context.setLineDash) {
      this.context.setLineDash(currentPalette.lineDash.map((n) => n * scale));
    }
  }

  /** */
  toContext(context) {
    this.context = context;
    if (this.resource.svgSelector) {
      this.svgContext();
    } else if (this.resource.fragmentSelector) {
      // TODO Merge 4.1, subtil change in condition
      this.fragmentContext();
    }
  }

  /** */
  get svgString() {
    return this.resource.svgSelector.value;
  }

  /** */
  svgContext() {
    let currentPalette;
    if (this.hovered) {
      currentPalette = this.palette.hovered;
    } else if (this.selected) {
      currentPalette = this.palette.selected;
    } else {
      currentPalette = this.draftPalette || this.palette.default;
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
        'stroke-width': 'lineWidth',
      };
      Object.keys(svgToCanvasMap).forEach((key) => {
        if (element.attributes[key]) {
          const value = element.attributes[key].nodeValue;
          if (key === 'stroke-width') {
            const parsedStrokeWidth = Number.parseFloat(value);
            this.context.lineWidth = Number.isFinite(parsedStrokeWidth) ? parsedStrokeWidth : this.context.lineWidth;
          } else {
            this.context[svgToCanvasMap[key]] = value;
          }
        }
      });

      this.context.lineWidth = Number.isFinite(this.context.lineWidth) ? this.context.lineWidth : 1;

      // Reset the color if it is selected or hovered on, or a draft
      if (this.selected || this.hovered) {
        this.context.strokeStyle = currentPalette.strokeStyle || currentPalette.fillStyle;
      } else if (currentPalette === this.draftPalette) {
        this.context.strokeStyle = currentPalette.strokeStyle || this.context.strokeStyle;
        this.applyLineDash(currentPalette);
      }

      if (element.attributes['stroke-opacity']) {
        this.context.globalAlpha = currentPalette.globalAlpha * element.attributes['stroke-opacity'].nodeValue;
      } else {
        this.context.globalAlpha = currentPalette.globalAlpha;
      }

      // Wait to set the fill, so we can adjust the globalAlpha value if we need to
      if (element.attributes.fill && element.attributes.fill.nodeValue !== 'none') {
        if (element.attributes['fill-opacity']) {
          this.context.globalAlpha = currentPalette.globalAlpha * element.attributes['fill-opacity'].nodeValue;
        } else {
          this.context.globalAlpha = currentPalette.globalAlpha;
        }
        this.context.fill(p);
      }

      this.context.stroke(p);
      this.context.restore();
    });
  }

  /** */
  fragmentContext() {
    const fragment = this.resource.fragmentSelector || this.canvasSize;
    if (!fragment) {
      return;
    }
    fragment[0] += this.offset.x;
    fragment[1] += this.offset.y;

    let currentPalette;
    if (this.selected) {
      currentPalette = this.palette.selected;
    } else if (this.hovered) {
      currentPalette = this.palette.hovered;
    } else {
      currentPalette = this.draftPalette || this.palette.default;
    }

    this.context.save();
    Object.keys(currentPalette).forEach((key) => {
      if (key === 'lineDash') return;
      this.context[key] = currentPalette[key];
    });
    this.applyLineDash(currentPalette, 1 / this.zoomRatio);

    if (currentPalette.globalAlpha === 0) return;

    if (currentPalette.fillStyle) {
      this.context.fillRect(...fragment);
    } else {
      this.context.lineWidth = 1 / this.zoomRatio;
      this.context.strokeRect(...fragment);
    }

    if (this.imageSource) {
      this.context.drawImage(this.imageSource, ...fragment);
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
