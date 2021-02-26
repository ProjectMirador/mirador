"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _flatten = _interopRequireDefault(require("lodash/flatten"));

var _AnnotationItem = _interopRequireDefault(require("./AnnotationItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Annotation representation for IIIF Presentation v3
 * https://iiif.io/api/presentation/3.0/#55-annotation-page
 */
var AnnotationPage = /*#__PURE__*/function () {
  /** */
  function AnnotationPage(json, target) {
    _classCallCheck(this, AnnotationPage);

    this.json = json;
    this.target = target;
  }
  /** */


  _createClass(AnnotationPage, [{
    key: "id",
    get: function get() {
      return this.json.id;
    }
    /** */

  }, {
    key: "present",
    value: function present() {
      return this.items && this.items.length > 0;
    }
    /** */

  }, {
    key: "items",
    get: function get() {
      var _this = this;

      this._items = this._items || function () {
        // eslint-disable-line no-underscore-dangle
        if (!_this.json || !_this.json.items) return [];
        return (0, _flatten["default"])([_this.json.items]).map(function (resource) {
          return new _AnnotationItem["default"](resource);
        });
      }();

      return this._items; // eslint-disable-line no-underscore-dangle
    }
    /**
     * Alias to items for compatibility for right now.
     */

  }, {
    key: "resources",
    get: function get() {
      return this.items;
    }
  }]);

  return AnnotationPage;
}();

exports["default"] = AnnotationPage;