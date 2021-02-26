"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _flatten = _interopRequireDefault(require("lodash/flatten"));

var _AnnotationResource = _interopRequireDefault(require("./AnnotationResource"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** */
var AnnotationList = /*#__PURE__*/function () {
  /** */
  function AnnotationList(json, target) {
    _classCallCheck(this, AnnotationList);

    this.json = json;
    this.target = target;
  }
  /** */


  _createClass(AnnotationList, [{
    key: "id",
    get: function get() {
      return this.json['@id'];
    }
    /** */

  }, {
    key: "present",
    value: function present() {
      return this.resources && this.resources.length > 0;
    }
    /** */

  }, {
    key: "resources",
    get: function get() {
      var _this = this;

      this._resources = this._resources || function () {
        // eslint-disable-line no-underscore-dangle
        if (!_this.json || !_this.json.resources) return [];
        return (0, _flatten["default"])([_this.json.resources]).map(function (resource) {
          return new _AnnotationResource["default"](resource);
        });
      }();

      return this._resources; // eslint-disable-line no-underscore-dangle
    }
  }]);

  return AnnotationList;
}();

exports["default"] = AnnotationList;