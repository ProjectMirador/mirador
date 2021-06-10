"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MosaicRenderPreview = MosaicRenderPreview;

var _react = _interopRequireDefault(require("react"));

var _MinimalWindow = _interopRequireDefault(require("../containers/MinimalWindow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * MosaicRenderPreview is used to for the preview when dragging a mosaic window/tile
*/
function MosaicRenderPreview(props) {
  var t = props.t,
      title = props.title,
      windowId = props.windowId;
  return /*#__PURE__*/_react["default"].createElement(_MinimalWindow["default"], {
    windowId: "".concat(windowId, "-preview"),
    label: t('previewWindowTitle', {
      title: title
    }),
    ariaLabel: false
  });
}

MosaicRenderPreview.defaultProps = {
  t: function t(k) {
    return k;
  },
  title: ''
};