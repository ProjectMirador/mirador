"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompanionWindowFactory = void 0;

var _react = _interopRequireWildcard(require("react"));

var _CompanionWindowRegistry = _interopRequireDefault(require("../lib/CompanionWindowRegistry"));

var _CompanionWindow = _interopRequireDefault(require("../containers/CompanionWindow"));

var _ErrorContent = _interopRequireDefault(require("../containers/ErrorContent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
 * Render a companion window using the appropriate component for the content
 */
var CompanionWindowFactory = /*#__PURE__*/function (_Component) {
  _inherits(CompanionWindowFactory, _Component);

  var _super = _createSuper(CompanionWindowFactory);

  /** */
  function CompanionWindowFactory(props) {
    var _this;

    _classCallCheck(this, CompanionWindowFactory);

    _this = _super.call(this, props);
    _this.state = {};
    return _this;
  }
  /** */


  _createClass(CompanionWindowFactory, [{
    key: "componentDidUpdate",
    value:
    /**
     * Clear the error state if the internal content changes; this is a rare
     * case, only when we reuse an existing companionWindow instance for
     * the left-anchored companion area (anti-pattern?)
     */
    function componentDidUpdate(prevProps) {
      var content = this.props.content; // Typical usage (don't forget to compare props):

      if (content !== prevProps.content) {
        this.setState({
          // eslint-disable-line react/no-did-update-set-state
          error: null,
          hasError: false
        });
      }
    }
    /** */

  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          content = _this$props.content,
          windowId = _this$props.windowId,
          id = _this$props.id,
          t = _this$props.t;
      var _this$state = this.state,
          error = _this$state.error,
          hasError = _this$state.hasError;

      if (hasError) {
        return /*#__PURE__*/_react["default"].createElement(_CompanionWindow["default"], {
          title: t('error'),
          windowId: windowId,
          id: id
        }, /*#__PURE__*/_react["default"].createElement(_ErrorContent["default"], {
          error: error,
          windowId: windowId,
          companionWindowId: id
        }));
      }

      var type = _CompanionWindowRegistry["default"][content];
      if (!type) return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
      return /*#__PURE__*/_react["default"].createElement(type, {
        id: id,
        windowId: windowId
      });
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return {
        error: error,
        hasError: true
      };
    }
  }]);

  return CompanionWindowFactory;
}(_react.Component);

exports.CompanionWindowFactory = CompanionWindowFactory;
CompanionWindowFactory.defaultProps = {
  content: null,
  t: function t(key) {
    return key;
  }
};