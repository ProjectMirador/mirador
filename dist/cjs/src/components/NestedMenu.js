"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NestedMenu = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ListItemIcon = _interopRequireDefault(require("@material-ui/core/ListItemIcon"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _ExpandLessSharp = _interopRequireDefault(require("@material-ui/icons/ExpandLessSharp"));

var _ExpandMoreSharp = _interopRequireDefault(require("@material-ui/icons/ExpandMoreSharp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * NestedMenu ~ A presentation component to render a menu item and have
 * it control the visibility of the MUI List passed in as the children
*/
var NestedMenu = /*#__PURE__*/function (_Component) {
  _inherits(NestedMenu, _Component);

  var _super = _createSuper(NestedMenu);

  /**
   * constructor -
   */
  function NestedMenu(props) {
    var _this;

    _classCallCheck(this, NestedMenu);

    _this = _super.call(this, props);
    _this.state = {
      nestedMenuIsOpen: false
    };
    _this.handleMenuClick = _this.handleMenuClick.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   * handleMenuClick toggles the nestedMenuIsOpen state
   */


  _createClass(NestedMenu, [{
    key: "handleMenuClick",
    value: function handleMenuClick() {
      var nestedMenuIsOpen = this.state.nestedMenuIsOpen;
      this.setState({
        nestedMenuIsOpen: !nestedMenuIsOpen
      });
    }
    /**
     * Returns the rendered component.  Spreads unused props to MenuItem
    */

  }, {
    key: "render",
    value: function render() {
      var nestedMenuIsOpen = this.state.nestedMenuIsOpen;

      var _this$props = this.props,
          children = _this$props.children,
          icon = _this$props.icon,
          label = _this$props.label,
          otherProps = _objectWithoutProperties(_this$props, ["children", "icon", "label"]);

      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], Object.assign({
        onClick: this.handleMenuClick,
        divider: nestedMenuIsOpen
      }, otherProps), icon && /*#__PURE__*/_react["default"].createElement(_ListItemIcon["default"], null, icon), /*#__PURE__*/_react["default"].createElement(_ListItemText["default"], {
        primaryTypographyProps: {
          variant: 'body1'
        }
      }, label), nestedMenuIsOpen ? /*#__PURE__*/_react["default"].createElement(_ExpandLessSharp["default"], null) : /*#__PURE__*/_react["default"].createElement(_ExpandMoreSharp["default"], null)), nestedMenuIsOpen && children);
    }
  }]);

  return NestedMenu;
}(_react.Component);

exports.NestedMenu = NestedMenu;
NestedMenu.defaultProps = {
  icon: null
};