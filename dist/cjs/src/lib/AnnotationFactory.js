"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AnnotationList = _interopRequireDefault(require("./AnnotationList"));

var _AnnotationPage = _interopRequireDefault(require("./AnnotationPage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Used to determine the type of Annotation supported by a version of the IIIF
 * Presentation API.
 */
var AnnotationFactory = /*#__PURE__*/function () {
  function AnnotationFactory() {
    _classCallCheck(this, AnnotationFactory);
  }

  _createClass(AnnotationFactory, null, [{
    key: "determineAnnotation",
    value:
    /** */
    function determineAnnotation(json, target) {
      if (!json) {
        return null;
      } // IIIF Presentation API v3. AnnotationPage


      if (json.type === 'AnnotationPage') {
        return new _AnnotationPage["default"](json, target);
      } // IIIF Presentation API v2. OpenAnnotation and SharedCanvas models


      return new _AnnotationList["default"](json, target);
    }
  }]);

  return AnnotationFactory;
}();

exports["default"] = AnnotationFactory;