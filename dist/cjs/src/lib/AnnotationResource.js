"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _compact = _interopRequireDefault(require("lodash/compact"));

var _flatten = _interopRequireDefault(require("lodash/flatten"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** */
var AnnotationResource = /*#__PURE__*/function () {
  /** */
  function AnnotationResource() {
    var resource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, AnnotationResource);

    this.resource = resource;
  }
  /** */


  _createClass(AnnotationResource, [{
    key: "isOnlyTag",
    value: function isOnlyTag() {
      return this.motivations.length === 1 && this.motivations[0] === 'oa:tagging';
    }
    /** */

  }, {
    key: "id",
    get: function get() {
      this._id = this._id || this.resource['@id'] || this.resources[0] && this.resources[0]['@id'] || (0, _uuid.v4)();
      return this._id; // eslint-disable-line no-underscore-dangle
    }
    /** */

  }, {
    key: "targetId",
    get: function get() {
      var on = this.on[0];

      switch (typeof on) {
        case 'string':
          return on.replace(/#?xywh=(.*)$/, '');

        case 'object':
          return on.full.replace(/#?xywh=(.*)$/, '');

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
      return (0, _flatten["default"])((0, _compact["default"])(new Array(this.resource.motivation)));
    }
    /** */

  }, {
    key: "resources",
    get: function get() {
      return (0, _flatten["default"])((0, _compact["default"])(new Array(this.resource.resource)));
    }
    /** */

  }, {
    key: "on",
    get: function get() {
      return (0, _flatten["default"])((0, _compact["default"])(new Array(this.resource.on)));
    }
    /** */

  }, {
    key: "tags",
    get: function get() {
      if (this.isOnlyTag()) {
        return this.resources.map(function (r) {
          return r.chars;
        });
      }

      return this.resources.filter(function (r) {
        return r['@type'] === 'oa:Tag';
      }).map(function (r) {
        return r.chars;
      });
    }
    /** */

  }, {
    key: "chars",
    get: function get() {
      return this.resources.filter(function (r) {
        return r['@type'] !== 'oa:Tag';
      }).map(function (r) {
        return r.chars;
      }).join(' ');
    }
    /** */

  }, {
    key: "selector",
    get: function get() {
      var on = this.on[0];

      switch (typeof on) {
        case 'string':
          return on;

        case 'object':
          // For choices, just return the default for now. FIXME: enhance for SVG
          // selectors
          if (on.selector['@type'] === 'oa:Choice') {
            return on.selector["default"];
          }

          return on.selector;

        default:
          return null;
      }
    }
    /** */

  }, {
    key: "svgSelector",
    get: function get() {
      var on = this.on[0];

      switch (typeof on) {
        case 'string':
          return null;

        case 'object':
          if (on.selector && on.selector.item && on.selector.item['@type'] === 'oa:SvgSelector') {
            return on.selector.item;
          }

          return null;

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

      switch (typeof selector) {
        case 'string':
          match = selector.match(/xywh=(.*)$/);
          break;

        case 'object':
          match = selector.value.match(/xywh=(.*)$/);
          break;

        default:
          return null;
      }

      return match && match[1].split(',').map(function (str) {
        return parseInt(str, 10);
      });
    }
  }]);

  return AnnotationResource;
}();

exports["default"] = AnnotationResource;