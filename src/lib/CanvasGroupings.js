/**
 *
 */
export default class CanvasGroupings {
  /**
   */
  constructor(canvases, viewType = 'single') {
    this.canvases = canvases;
    this.viewType = viewType;
    this._groupings = null;
    this._canvasGroupingMap = null;
  }

  /**
   * @deprecated
   */
  getCanvases(index) {
    switch (this.viewType) {
      case 'scroll':
        return this.groupings()[0];
      case 'book':
        return this.groupings()[this._canvasGroupingMap[index]];
      default:
        return this.groupings()[index];
    }
  }

  /**
   * Groups a set of canvases based on the view type. Single, is just an array
   * of canvases, while book view creates pairs.
   */
  groupings() {
    if (this.viewType === 'scroll') {
      return [this.canvases];
    }

    if (this.viewType === 'book') {
      return this.bookGroupings();
    }

    return this.canvases.map(canvas => [canvas]);
  }

  /**
   * Return a grouping of canvases appropriate for a page-turning interface, where
   * the first canvas is the first recto, and the second canvas is the back of the
   * object in the first canvas.
   *
   * This implementation also supports behavior/viewing hints for canvases imaged as facing pages,
   * as well as non-paged canvases (which are appended to the end of the group to preserve some
   * access consistency)
   */
  bookGroupings() {
    if (this._groupings) {
      return this._groupings;
    }

    const groupings = [];
    const appendedGroupings = [];

    let groupIndex = 0;

    function appendCanvas(canvas, index) {
      if (!groupings[index]) {
        groupings[index] = [];
      }

      groupings[index].push(canvas);
    }

    this.canvases.forEach((canvas, i) => {
      const hint = canvas && (
        (canvas.getBehavior && canvas.getBehavior())
        || (canvas.getViewingHint && canvas.getViewingHint())
      );

      if (hint === 'non-paged') {
        appendedGroupings.push([canvas]);
      } else if (hint === 'facing-pages') {
        if ((groupings[groupIndex] || []).length > 0) {
          groupIndex += 1;
        }

        appendCanvas(canvas, groupIndex);

        groupIndex += 1;
      } else {
        if ((groupings[groupIndex] || []).length >= 2) {
          groupIndex += 1;
        }

        appendCanvas(canvas, groupIndex);

        if (groupIndex == 0) {
          groupIndex += 1;
        }
      }
    });

    this._groupings = groupings.concat(appendedGroupings);
    this._canvasGroupingMap = this._bookkeepGroupings(this._groupings);

    return this._groupings;
  }

  /**
   * To support pagination by canvas index (probably unused...), we need to maintain a mapping of
   * a canvases index to the group index
   */
  _bookkeepGroupings(groupings) {
    const canvasGroupingMap = [];
    let canvasIndex = 0;

    groupings.forEach((group, groupIndex) => {
      group.forEach(canvas => {
        canvasGroupingMap[canvasIndex] = groupIndex;
        canvasIndex += 1;
      })
    });

    return canvasGroupingMap;
  }
}
