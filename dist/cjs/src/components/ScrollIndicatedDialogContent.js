"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollIndicatedDialogContent = ScrollIndicatedDialogContent;

var _react = _interopRequireDefault(require("react"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * ScrollIndicatedDialogContent ~ Inject a style into the DialogContent component
 *                                to indicate there is scrollable content
*/
function ScrollIndicatedDialogContent(props) {
  var classes = props.classes,
      className = props.className,
      otherProps = _objectWithoutProperties(props, ["classes", "className"]);

  var ourClassName = [className, classes.shadowScrollDialog].join(' ');
  return /*#__PURE__*/_react["default"].createElement(_DialogContent["default"], Object.assign({
    className: ourClassName
  }, otherProps));
}

ScrollIndicatedDialogContent.defaultProps = {
  className: ''
};