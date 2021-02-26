"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** */
var TruncatedHit = /*#__PURE__*/function () {
  /** */
  function TruncatedHit(hit) {
    var annotation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$maxChars = _ref.maxChars,
        maxChars = _ref$maxChars === void 0 ? 200 : _ref$maxChars,
        _ref$minimum = _ref.minimum,
        minimum = _ref$minimum === void 0 ? 20 : _ref$minimum;

    _classCallCheck(this, TruncatedHit);

    this.hit = hit;
    this.annotation = annotation;
    this.maxChars = maxChars || 200;
    this.minimum = minimum || 20;
  }
  /** */


  _createClass(TruncatedHit, [{
    key: "match",
    get: function get() {
      return this.hit.match || this.annotation && this.annotation.resource.resource.chars || '-';
    }
    /** */

  }, {
    key: "charsOnSide",
    get: function get() {
      var resultingChars = (this.maxChars - this.match.length) / 2;
      var measured = [(this.hit.before || '').length, (this.hit.after || '').length].filter(function (length) {
        return length > 0;
      });
      return Math.max(Math.min.apply(Math, [resultingChars].concat(_toConsumableArray(measured))), this.minimum);
    }
    /** */

  }, {
    key: "before",
    get: function get() {
      if (!this.hit.before) return '';
      return this.hit.before.substring(this.hit.before.length - this.charsOnSide, this.hit.before.length);
    }
    /** */

  }, {
    key: "after",
    get: function get() {
      if (!this.hit.after) return '';
      return this.hit.after.substring(0, Math.min(this.hit.after.length, this.charsOnSide));
    }
  }]);

  return TruncatedHit;
}();

exports["default"] = TruncatedHit;