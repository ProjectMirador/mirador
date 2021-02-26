function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

import React, { Component } from 'react';
import 'intersection-observer'; // polyfill needed for Safari

import Typography from '@material-ui/core/Typography';
import IntersectionObserver from '@researchgate/react-intersection-observer';
import classNames from 'classnames';
import getThumbnail from '../lib/ThumbnailFactory';
/**
 * Uses InteractionObserver to "lazy" load canvas thumbnails that are in view.
 */

export var IIIFThumbnail = /*#__PURE__*/function (_Component) {
  _inherits(IIIFThumbnail, _Component);

  var _super = _createSuper(IIIFThumbnail);

  /**
   */
  function IIIFThumbnail(props) {
    var _this;

    _classCallCheck(this, IIIFThumbnail);

    _this = _super.call(this, props);
    _this.state = {
      loaded: false
    };
    _this.handleIntersection = _this.handleIntersection.bind(_assertThisInitialized(_this));
    return _this;
  }
  /** */


  _createClass(IIIFThumbnail, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.setState(function (state) {
        return _objectSpread(_objectSpread({}, state), {}, {
          image: _this2.image()
        });
      });
    }
    /** */

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this3 = this;

      var _this$props = this.props,
          maxHeight = _this$props.maxHeight,
          maxWidth = _this$props.maxWidth,
          resource = _this$props.resource;

      if (prevProps.maxHeight !== maxHeight || prevProps.maxWidth !== maxWidth || prevProps.resource !== resource) {
        this.setState(function (state) {
          return _objectSpread(_objectSpread({}, state), {}, {
            image: _this3.image()
          });
        }); // eslint-disable-line
      }
    }
    /**
     * Handles the intersection (visibility) of a given thumbnail, by requesting
     * the image and then updating the state.
     */

  }, {
    key: "handleIntersection",
    value: function handleIntersection(event) {
      var loaded = this.state.loaded;
      if (loaded || !event.isIntersecting) return;
      this.setState(function (state) {
        return _objectSpread(_objectSpread({}, state), {}, {
          loaded: true
        });
      });
    }
    /**
     *
    */

  }, {
    key: "imageStyles",
    value: function imageStyles() {
      var _this$props2 = this.props,
          maxHeight = _this$props2.maxHeight,
          maxWidth = _this$props2.maxWidth,
          style = _this$props2.style;
      var image = this.image();
      var styleProps = {
        height: 'auto',
        width: 'auto'
      };
      if (!image) return _objectSpread(_objectSpread({}, style), {}, {
        height: maxHeight || 'auto',
        width: maxWidth || 'auto'
      });
      var thumbHeight = image.height,
          thumbWidth = image.width;

      if (thumbHeight && thumbWidth) {
        if (maxHeight && thumbHeight > maxHeight || maxWidth && thumbWidth > maxWidth) {
          var aspectRatio = thumbWidth / thumbHeight;

          if (maxHeight && maxWidth) {
            if (maxWidth / maxHeight < aspectRatio) {
              styleProps.height = Math.round(maxWidth / aspectRatio);
              styleProps.width = maxWidth;
            } else {
              styleProps.height = maxHeight;
              styleProps.width = Math.round(maxHeight * aspectRatio);
            }
          } else if (maxHeight) {
            styleProps.height = maxHeight;
            styleProps.maxWidth = Math.round(maxHeight * aspectRatio);
          } else if (maxWidth) {
            styleProps.width = maxWidth;
            styleProps.maxHeight = Math.round(maxWidth / aspectRatio);
          }
        } else {
          styleProps.width = thumbWidth;
          styleProps.height = thumbHeight;
        }
      } else if (thumbHeight && !thumbWidth) {
        styleProps.height = maxHeight;
      } else if (!thumbHeight && thumbWidth) {
        styleProps.width = maxWidth;
      }

      return _objectSpread(_objectSpread({}, styleProps), style);
    }
    /** */

  }, {
    key: "image",
    value: function image() {
      var _this$props3 = this.props,
          thumbnail = _this$props3.thumbnail,
          resource = _this$props3.resource,
          maxHeight = _this$props3.maxHeight,
          maxWidth = _this$props3.maxWidth;
      if (thumbnail) return thumbnail;
      var image = getThumbnail(resource, {
        maxHeight: maxHeight,
        maxWidth: maxWidth
      });
      if (image && image.url) return image;
      return undefined;
    }
    /** */

  }, {
    key: "label",
    value: function label() {
      var _this$props4 = this.props,
          label = _this$props4.label,
          resource = _this$props4.resource;
      return label || IIIFThumbnail.getUseableLabel(resource);
    }
    /**
     */

  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          children = _this$props5.children,
          classes = _this$props5.classes,
          imagePlaceholder = _this$props5.imagePlaceholder,
          labelled = _this$props5.labelled,
          thumbnail = _this$props5.thumbnail,
          variant = _this$props5.variant;
      var _this$state = this.state,
          image = _this$state.image,
          loaded = _this$state.loaded;

      var _ref = loaded && (thumbnail || image) || {},
          _ref$url = _ref.url,
          src = _ref$url === void 0 ? imagePlaceholder : _ref$url;

      return /*#__PURE__*/React.createElement("div", {
        className: classNames(classes.root, _defineProperty({}, classes["".concat(variant, "Root")], variant))
      }, /*#__PURE__*/React.createElement(IntersectionObserver, {
        onChange: this.handleIntersection
      }, /*#__PURE__*/React.createElement("img", {
        alt: "",
        role: "presentation",
        src: src,
        style: this.imageStyles(),
        className: classes.image
      })), labelled && /*#__PURE__*/React.createElement("div", {
        className: classNames(classes.label, _defineProperty({}, classes["".concat(variant, "Label")], variant))
      }, /*#__PURE__*/React.createElement(Typography, {
        variant: "caption",
        classes: {
          root: classNames(classes.caption, _defineProperty({}, classes["".concat(variant, "Caption")], variant))
        }
      }, this.label())), children);
    }
  }], [{
    key: "getUseableLabel",
    value:
    /** */
    function getUseableLabel(resource, index) {
      return resource && resource.getLabel && resource.getLabel().length > 0 ? resource.getLabel().getValue() : String(index + 1);
    }
  }]);

  return IIIFThumbnail;
}(Component);
IIIFThumbnail.defaultProps = {
  children: null,
  classes: {},
  // Transparent "gray"
  imagePlaceholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMMDQmtBwADgwF/Op8FmAAAAABJRU5ErkJggg==',
  label: undefined,
  labelled: false,
  maxHeight: null,
  maxWidth: null,
  style: {},
  thumbnail: null,
  variant: null
};