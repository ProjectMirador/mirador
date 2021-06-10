function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import { createRemoveUpdate, updateTree } from 'react-mosaic-component/lib/util/mosaicUpdates';
import { getNodeAtPath, getOtherDirection, getPathToCorner, Corner } from 'react-mosaic-component/lib/util/mosaicUtilities';
import dropRight from 'lodash/dropRight';
/** */

var MosaicLayout = /*#__PURE__*/function () {
  /** */
  function MosaicLayout(layout) {
    _classCallCheck(this, MosaicLayout);

    this.layout = layout;
  }
  /** */


  _createClass(MosaicLayout, [{
    key: "pathToCorner",
    value: function pathToCorner() {
      var corner = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Corner.TOP_RIGHT;
      return getPathToCorner(this.layout, corner);
    }
    /** */

  }, {
    key: "pathToParent",
    value: function pathToParent(path) {
      return getNodeAtPath(this.layout, dropRight(path));
    }
    /** */

  }, {
    key: "nodeAtPath",
    value: function nodeAtPath(path) {
      return getNodeAtPath(this.layout, path);
    }
    /**
     * addWindows - updates the layout with new windows using an algorithm ported
     * from the react-mosaic-components examples. Will always add to the Top Right
     * https://github.com/nomcopter/react-mosaic/blob/5081df8d1528d4c3b83a72763a46a30b3048fe95/demo/ExampleApp.tsx#L119-L154
     * @param {Array} addedWindowIds [description]
     */

  }, {
    key: "addWindows",
    value: function addWindows(addedWindowIds) {
      var _this = this;

      addedWindowIds.forEach(function (windowId, i) {
        var path = _this.pathToCorner();

        var parent = _this.pathToParent(path);

        var destination = _this.nodeAtPath(path);

        var direction = parent ? getOtherDirection(parent.direction) : 'row';
        var first;
        var second;

        if (direction === 'row') {
          first = destination;
          second = addedWindowIds[i];
        } else {
          first = addedWindowIds[i];
          second = destination;
        }

        var update = {
          path: path,
          spec: {
            $set: {
              direction: direction,
              first: first,
              second: second
            }
          }
        }; // We cannot batch the updates together because we need to recalculate
        // the new location for each new window

        _this.layout = updateTree(_this.layout, [update]);
      });
    }
    /**
     * removeWindows - Generate a set of "removeUpdates" to update layout binary
     * tree. Then update the layout.
     * @param  {Array} removedWindowIds
     * @param  {Object} windowPaths - a lookup table for window paths
     */

  }, {
    key: "removeWindows",
    value: function removeWindows(removedWindowIds, windowPaths) {
      var _this2 = this;

      var removeUpdates = removedWindowIds.map(function (windowId) {
        return createRemoveUpdate(_this2.layout, windowPaths[windowId]);
      });
      this.layout = updateTree(this.layout, removeUpdates);
    }
  }]);

  return MosaicLayout;
}();

export { MosaicLayout as default };