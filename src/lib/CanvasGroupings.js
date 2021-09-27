/**
 *
 */
export default class CanvasGroupings {
  /**
   */
  constructor(canvases, viewType = 'single', shiftBookView = false) {
    this.canvases = canvases;
    this.viewType = viewType;
    this.shiftBookView = shiftBookView;
    this._groupings = null; // eslint-disable-line no-underscore-dangle
  }

  /**
   */
  getCanvases(index) {
    if (this.viewType === 'single') {
      return this.groupings()[index];
    }
    const canvasId = this.canvases[index];
    return this.groupings().find(g => g.indexOf(canvasId) >= 0);
  }

  /**
   * Groups a set of canvases based on the view type. Single, is just an array
   * of canvases, while book view creates pairs.
   */
  groupings() {
    if (this._groupings) { // eslint-disable-line no-underscore-dangle
      return this._groupings; // eslint-disable-line no-underscore-dangle
    }
    if (this.viewType === 'scroll') {
      return [this.canvases];
    }
    if (this.viewType !== 'book') {
      return this.canvases.map(canvas => [canvas]);
    }
    const groupings = [];
    this.canvases.forEach((canvas, i) => {
      if (i === 0) {
        groupings.push([canvas]);
        return;
      }
      const isOddPage = i % 2 !== 0;
      const isEvenPage = !isOddPage;
      if ((isOddPage && !this.shiftBookView) || (isEvenPage && this.shiftBookView)) {
        // Odd page unshifted, or even page shifted
        groupings.push([canvas]);
      } else {
        // Odd page shifted, or even page unshifted
        groupings[groupings.length - 1].push(canvas);
      }
    });
    this._groupings = groupings; // eslint-disable-line no-underscore-dangle
    return groupings;
  }
}
