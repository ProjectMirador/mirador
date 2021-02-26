function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import compact from 'lodash/compact';
import flatten from 'lodash/flatten';
import { v4 as uuid } from 'uuid';
/**
 * A modeled WebAnnotation item
 */

var AnnotationItem = /*#__PURE__*/function () {
  /** */
  function AnnotationItem() {
    var resource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, AnnotationItem);

    this.resource = resource;
  }
  /** */


  _createClass(AnnotationItem, [{
    key: "isOnlyTag",
    value: function isOnlyTag() {
      return this.motivations.length === 1 && this.motivations[0] === 'tagging';
    }
    /** */

  }, {
    key: "id",
    get: function get() {
      this._id = this._id || this.resource.id || uuid(); // eslint-disable-line no-underscore-dangle

      return this._id; // eslint-disable-line no-underscore-dangle
    }
    /** */

  }, {
    key: "targetId",
    get: function get() {
      var target = this.target[0];

      switch (typeof target) {
        case 'string':
          return target.replace(/#?xywh=(.*)$/, '');

        case 'object':
          return target.source && target.source.id || target.source || target.id;

        default:
          return null;
      }
    }
    /**
     * @return {[Array]}
     */

  }, {
    key: "motivations",
    get: function get() {
      return flatten(compact(new Array(this.resource.motivation)));
    }
    /** */

  }, {
    key: "body",
    get: function get() {
      return flatten(compact(new Array(this.resource.body)));
    }
    /** */

  }, {
    key: "resources",
    get: function get() {
      return this.body;
    }
    /** */

  }, {
    key: "tags",
    get: function get() {
      if (this.isOnlyTag()) {
        return this.body.map(function (r) {
          return r.value;
        });
      }

      return this.body.filter(function (r) {
        return r.purpose === 'tagging';
      }).map(function (r) {
        return r.value;
      });
    }
    /** */

  }, {
    key: "target",
    get: function get() {
      return flatten(compact(new Array(this.resource.target)));
    }
    /** */

  }, {
    key: "chars",
    get: function get() {
      if (this.isOnlyTag()) return null;
      return this.body.filter(function (r) {
        return r.purpose !== 'tagging';
      }).map(function (r) {
        return r.value;
      }).join(' ');
    }
    /** */

  }, {
    key: "selector",
    get: function get() {
      var target = this.target[0];

      switch (typeof target) {
        case 'string':
          return target;

        case 'object':
          return flatten(compact(new Array(target.selector)));

        default:
          return null;
      }
    }
    /** */

  }, {
    key: "svgSelector",
    get: function get() {
      var selector = this.selector;

      switch (typeof selector) {
        case 'string':
          return null;

        case 'object':
          return selector.find(function (s) {
            return s.type && s.type === 'SvgSelector';
          });

        default:
          return null;
      }
    }
    /** */

  }, {
    key: "fragmentSelector",
    get: function get() {
      var selector = this.selector;
      var match;
      var fragmentSelector;

      switch (typeof selector) {
        case 'string':
          match = selector.match(/xywh=(.*)$/);
          break;

        case 'object':
          fragmentSelector = selector.find(function (s) {
            return s.type && s.type === 'FragmentSelector';
          });
          match = fragmentSelector && fragmentSelector.value.match(/xywh=(.*)$/);
          break;

        default:
          return null;
      }

      return match && match[1].split(',').map(function (str) {
        return parseInt(str, 10);
      });
    }
  }]);

  return AnnotationItem;
}();

export { AnnotationItem as default };