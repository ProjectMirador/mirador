import { TreeNode } from 'manifesto.js';

class RangeTraverser {
  constructor(jsonld, manifest) {
    this.jsonld = jsonld;
    this.manifest = manifest;
  }

  getRecursiveCanvasIds() {
    return [
      ...(this.jsonld.canvases || []),
      ...(this.jsonld.ranges || [])
        .map((id) => this.getRange(id))
        .map((r) => new RangeTraverser(r, this.manifest).getRecursiveCanvasIds())
        .flat(),
      ...(this.jsonld.members || [])
        .map((member) =>
          this.isRangeId(member)
            ? new RangeTraverser(this.getRange(member), this.manifest).getRecursiveCanvasIds()
            : this.isCanvas(member) && (member.id || member['@id']),
        )
        .filter(Boolean)
        .flat(),
      ...(this.jsonld.items || [])
        .map((item) =>
          this.isRange(item)
            ? new RangeTraverser(item, this.manifest).getRecursiveCanvasIds()
            : this.isCanvas(item) && (item.id || item['@id']),
        )
        .filter(Boolean)
        .flat(),
    ];
  }

  getRange(id) {
    return this.manifest.getRangeById(id).__jsonld;
  }

  isRange(item) {
    return (
      item['@type'] === 'sc:Range' ||
      item['@type'] === 'Range' ||
      item.type === 'Range' ||
      item.items ||
      item.canvases ||
      item.ranges ||
      item.members
    );
  }

  isRangeId(id) {
    const range = this.getRange(id);
    return range && this.isRange(range);
  }

  isCanvas(item) {
    return item['@type'] === 'sc:Canvas' || item['@type'] === 'Canvas' || item.type === 'Canvas';
  }
}

class MiradorRangeSequence {
  #canvases;

  constructor(rangeOrSequence, manifest) {
    this.resource = rangeOrSequence;
    this.manifest = manifest;
  }

  get id() {
    return this.resource.id;
  }

  getLabel() {
    return this.resource.getLabel();
  }

  // manifesto doesn't handle the IIIF v2 Range members property correctly, and doesn't
  // deeply traverse the nested rangesto get all canvases
  getCanvases() {
    if (this.#canvases) return this.#canvases;

    // for sequences:
    if (this.resource.getCanvases) {
      this.#canvases = this.resource.getCanvases();
      return this.#canvases;
    }

    // for ranges, we need to get all nested canvas ids recursively
    if (this.resource.getCanvasIds) {
      const ids = this._getNestedCanvasIds();

      const sequence = this.manifest.getSequenceByIndex(0);

      this.#canvases = ids.map((id) => sequence.getCanvasById(id));
      return this.#canvases;
    }

    return [];
  }

  _getNestedCanvasIds() {
    return new RangeTraverser(this.resource.__jsonld, this.manifest).getRecursiveCanvasIds();
  }

  getCanvasById(canvasId) {
    if (this.resource.getCanvasById) {
      return this.resource.getCanvasById(canvasId);
    }

    return this.getCanvases().find((c) => c.id === canvasId);
  }

  getCanvasByIndex(index) {
    return this.getCanvases()[index];
  }

  getViewingHint() {
    return this.resource.getViewingHint() || this.manifest.getViewingHint();
  }

  getViewingDirection() {
    return this.resource.getViewingDirection() || this.manifest.getViewingDirection();
  }

  getProperty(property) {
    return this.resource.getProperty(property);
  }

  isRange() {
    return this.resource.isRange();
  }

  getTree() {
    return this.resource.getTree(new TreeNode('root'));
  }
}

export default MiradorRangeSequence;
