/**
 * CanvasAnnotationDisplay - class used to display a SVG and fragment based
 * annotations.
 */
import OpenSeadragon from 'openseadragon';

export function updateSVGPalette(currentPalette, svgElement, svgVisible = false, override = true) {
  svgElement.style.opacity = svgVisible ? '1' : '0';
  Object.keys(currentPalette).forEach((key) => {
    svgElement.querySelectorAll('*').forEach((element) => {
      if ((!element.style[key] && !element.getAttribute(key)) || override) {
        element.setAttribute(key, currentPalette[key]);
      }
    });
  });
}

export default class CanvasAnnotationDisplay {
  /** */
  constructor({ resource, palette, viewportCanvas, viewer }) {
    this.resource = resource;
    this.palette = palette;
    this.viewportCanvas = viewportCanvas;
    this.viewer = viewer;
  }

  /** */
  toContext() {
    if (this.resource.svgSelector) {
      return this.svgContext();
    } else if (this.resource.fragmentSelector) {
      return this.fragmentContext();
    }
  }

  /** */
  get svgString() {
    return this.resource.svgSelector.value;
  }

  svgOverlay(element) {
    const svgElement = element.cloneNode(true);
    const overlayId = this.resource.resource.id;
    const existing = this.viewer.getOverlayById(overlayId);
    if (existing) {
      return;
    }
    
    updateSVGPalette(this.palette.default, svgElement, false);
    svgElement.id = overlayId;

    const imageLocation = this.fragmentLocation(svgElement);
    svgElement.setAttribute('viewBox', imageLocation.join(' '));
    
    const { x, y, width, height } = this.viewportCanvas.imageToViewportRectangle(...imageLocation);

    const overlay = this.viewer.addOverlay({
      element: svgElement,
      id: overlayId,
      location: new OpenSeadragon.Rect(x, y, width, height),
    });

    return svgElement;
  }
  /** */
  svgContext() {
    return this.svgOverlay(this.svgElement);
  }

  svgBBox(originalSVG) {
    const svg = originalSVG.cloneNode(true);
    svg.style.position = 'absolute';
    svg.style.visibility = 'hidden'; // or opacity: 0
    svg.id = 'getBounds';
    document.body.appendChild(svg);

    const { x, y, width, height } = document.querySelector('#getBounds').getBBox();

    document.body.removeChild(svg);
    return [x, y, width, height];
  }

  fragmentLocation(svgpath = undefined) {
    const fragment = this.resource.fragmentSelector;
    if (fragment) {
      return fragment;
    }
    if (svgpath) {
      return this.svgBBox(svgpath);
    }
    return [0, 0, 0, 0];
  }

  /** */
  fragmentContext() {
    const fragment = this.resource.fragmentSelector;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.innerHTML = `<rect x="${fragment[0]}" y="${fragment[1]}" width=${fragment[2]}" height="${fragment[3]}"/>`;
    return this.svgOverlay(svg);
  }

  /** */
  get svgElement() {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(this.svgString, 'text/xml');
    return xmlDoc.querySelector('svg');
  }
}
