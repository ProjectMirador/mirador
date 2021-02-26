"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollTo = void 0;

var _react = _interopRequireWildcard(require("react"));

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
 * ScrollTo ~
*/
var ScrollTo = /*#__PURE__*/function (_Component) {
  _inherits(ScrollTo, _Component);

  var _super = _createSuper(ScrollTo);

  /** */
  function ScrollTo(props) {
    var _this;

    _classCallCheck(this, ScrollTo);

    _this = _super.call(this, props);
    _this.scrollToRef = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }
  /** */


  _createClass(ScrollTo, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var scrollTo = this.props.scrollTo;
      if (!scrollTo) return;
      this.scrollToElement();
    }
    /**
     * If the scrollTo prop is true (and has been updated) scroll to the selected element
    */

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var scrollTo = this.props.scrollTo;

      if (scrollTo && prevProps.scrollTo !== scrollTo) {
        this.scrollToElement();
      }
    }
    /**
     * Return the getBoundingClientRect() of the containerRef prop
    */

  }, {
    key: "containerBoundingRect",
    value: function containerBoundingRect() {
      var containerRef = this.props.containerRef;
      if (!containerRef || !containerRef.current || !containerRef.current.domEl) return {};
      return containerRef.current.domEl.getBoundingClientRect();
    }
    /**
     * Return the getBoundingClientRect() of the scrollTo ref prop
    */

  }, {
    key: "scrollToBoundingRect",
    value: function scrollToBoundingRect() {
      if (!this.elementToScrollTo()) return {};
      return this.elementToScrollTo().getBoundingClientRect();
    }
    /**
     * Return the current scrollToRef
    */

  }, {
    key: "elementToScrollTo",
    value: function elementToScrollTo() {
      if (!this.scrollToRef || !this.scrollToRef.current) return null;
      return this.scrollToRef.current;
    }
    /**
     * The container provided in the containersRef dome structure in which scrolling
     * should happen.
    */

  }, {
    key: "scrollabelContainer",
    value: function scrollabelContainer() {
      var containerRef = this.props.containerRef;
      if (!containerRef || !containerRef.current || !containerRef.current.domEl) return null;
      return containerRef.current.domEl.getElementsByClassName('mirador-scrollto-scrollable')[0];
    }
    /**
     * Determine if the scrollTo element is visible within the given containerRef prop.
     * Currently only supports vertical elements but could be extended to support horizontal
    */

  }, {
    key: "elementIsVisible",
    value: function elementIsVisible() {
      var offsetTop = this.props.offsetTop;

      if (this.scrollToBoundingRect().top < this.containerBoundingRect().top + offsetTop) {
        return false;
      }

      if (this.scrollToBoundingRect().bottom > this.containerBoundingRect().bottom) {
        return false;
      }

      return true;
    }
    /**
     * Scroll to the element if it is set to be scolled and is not visible
    */

  }, {
    key: "scrollToElement",
    value: function scrollToElement() {
      var _this$props = this.props,
          offsetTop = _this$props.offsetTop,
          scrollTo = _this$props.scrollTo;
      if (!scrollTo) return;
      if (!this.elementToScrollTo()) return;
      if (this.elementIsVisible()) return;
      if (!this.scrollabelContainer()) return;
      var scrollBy = this.elementToScrollTo().offsetTop - this.containerBoundingRect().height / 2 + offsetTop;
      this.scrollabelContainer().scrollTo(0, scrollBy);
    }
    /**
     * Returns the rendered component
    */

  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          scrollTo = _this$props2.scrollTo;
      if (!scrollTo) return children;
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.scrollToRef
      }, children);
    }
  }]);

  return ScrollTo;
}(_react.Component);

exports.ScrollTo = ScrollTo;
ScrollTo.defaultProps = {
  offsetTop: 0
};