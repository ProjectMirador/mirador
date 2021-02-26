"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManifestListItem = void 0;

var _react = _interopRequireDefault(require("react"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ButtonBase = _interopRequireDefault(require("@material-ui/core/ButtonBase"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Skeleton = _interopRequireDefault(require("@material-ui/lab/Skeleton"));

var _reactImage = require("react-image");

var _ManifestListItemError = _interopRequireDefault(require("../containers/ManifestListItemError"));

var _cssNs = _interopRequireDefault(require("../config/css-ns"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
 * Represents an item in a list of currently-loaded or loading manifests
 * @param {object} props
 * @param {object} [props.manifest = string]
 */

/** */
var ManifestListItem = /*#__PURE__*/function (_React$Component) {
  _inherits(ManifestListItem, _React$Component);

  var _super = _createSuper(ManifestListItem);

  /** */
  function ManifestListItem(props) {
    var _this;

    _classCallCheck(this, ManifestListItem);

    _this = _super.call(this, props);
    _this.handleOpenButtonClick = _this.handleOpenButtonClick.bind(_assertThisInitialized(_this));
    return _this;
  }
  /** */


  _createClass(ManifestListItem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          fetchManifest = _this$props.fetchManifest,
          manifestId = _this$props.manifestId,
          ready = _this$props.ready,
          isFetching = _this$props.isFetching,
          error = _this$props.error,
          provider = _this$props.provider;
      if (!ready && !error && !isFetching && provider !== 'file') fetchManifest(manifestId);
    }
    /**
     * Handling open button click
     */

  }, {
    key: "handleOpenButtonClick",
    value: function handleOpenButtonClick() {
      var _this$props2 = this.props,
          addWindow = _this$props2.addWindow,
          handleClose = _this$props2.handleClose,
          manifestId = _this$props2.manifestId;
      addWindow({
        manifestId: manifestId
      });
      handleClose();
    }
    /** */

  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          active = _this$props3.active,
          buttonRef = _this$props3.buttonRef,
          manifestId = _this$props3.manifestId,
          ready = _this$props3.ready,
          title = _this$props3.title,
          thumbnail = _this$props3.thumbnail,
          manifestLogo = _this$props3.manifestLogo,
          size = _this$props3.size,
          classes = _this$props3.classes,
          provider = _this$props3.provider,
          t = _this$props3.t,
          error = _this$props3.error,
          isCollection = _this$props3.isCollection,
          isMultipart = _this$props3.isMultipart;

      var placeholder = /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
        container: true,
        className: (0, _cssNs["default"])('manifest-list-item'),
        spacing: 2
      }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
        item: true,
        xs: 3,
        sm: 2
      }, /*#__PURE__*/_react["default"].createElement(_Skeleton["default"], {
        className: classes.placeholder,
        variant: "rect",
        height: 80,
        width: 120
      })), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
        item: true,
        xs: 9,
        sm: 6
      }, /*#__PURE__*/_react["default"].createElement(_Skeleton["default"], {
        className: classes.placeholder,
        variant: "text"
      })), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
        item: true,
        xs: 8,
        sm: 2
      }, /*#__PURE__*/_react["default"].createElement(_Skeleton["default"], {
        className: classes.placeholder,
        variant: "text"
      }), /*#__PURE__*/_react["default"].createElement(_Skeleton["default"], {
        className: classes.placeholder,
        variant: "text"
      })), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
        item: true,
        xs: 4,
        sm: 2
      }, /*#__PURE__*/_react["default"].createElement(_Skeleton["default"], {
        className: classes.placeholder,
        variant: "rect",
        height: 60,
        width: 60
      })));

      if (error) {
        return /*#__PURE__*/_react["default"].createElement(_ListItem["default"], {
          divider: true,
          className: classes.root,
          "data-manifestid": manifestId
        }, /*#__PURE__*/_react["default"].createElement(_ManifestListItemError["default"], {
          manifestId: manifestId
        }));
      }

      return /*#__PURE__*/_react["default"].createElement(_ListItem["default"], {
        divider: true,
        className: [classes.root, active ? classes.active : ''].join(' '),
        "data-manifestid": manifestId
      }, ready ? /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
        container: true,
        className: (0, _cssNs["default"])('manifest-list-item'),
        spacing: 2
      }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
        item: true,
        xs: 12,
        sm: 6,
        className: classes.buttonGrid
      }, /*#__PURE__*/_react["default"].createElement(_ButtonBase["default"], {
        ref: buttonRef,
        className: (0, _cssNs["default"])('manifest-list-item-title'),
        style: {
          width: '100%'
        },
        onClick: this.handleOpenButtonClick
      }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
        container: true,
        spacing: 2,
        className: classes.label,
        component: "span"
      }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
        item: true,
        xs: 4,
        sm: 3,
        component: "span"
      }, /*#__PURE__*/_react["default"].createElement(_reactImage.Img, {
        className: [classes.thumbnail, (0, _cssNs["default"])('manifest-list-item-thumb')].join(' '),
        src: [thumbnail],
        alt: "",
        height: "80",
        unloader: /*#__PURE__*/_react["default"].createElement(_Skeleton["default"], {
          variant: "rect",
          animation: false,
          className: classes.placeholder,
          height: 80,
          width: 120
        })
      })), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
        item: true,
        xs: 8,
        sm: 9,
        component: "span"
      }, isCollection && /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        component: "div",
        variant: "overline"
      }, t(isMultipart ? 'multipartCollection' : 'collection')), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        component: "span",
        variant: "h6"
      }, title || manifestId))))), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
        item: true,
        xs: 8,
        sm: 4
      }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        className: (0, _cssNs["default"])('manifest-list-item-provider')
      }, provider || t('addedFromUrl')), /*#__PURE__*/_react["default"].createElement(_Typography["default"], null, t('numItems', {
        number: size
      }))), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
        item: true,
        xs: 4,
        sm: 2
      }, /*#__PURE__*/_react["default"].createElement(_reactImage.Img, {
        src: [manifestLogo],
        alt: "",
        role: "presentation",
        className: classes.logo,
        unloader: /*#__PURE__*/_react["default"].createElement(_Skeleton["default"], {
          variant: "rect",
          animation: false,
          className: classes.placeholder,
          height: 60,
          width: 60
        })
      }))) : placeholder);
    }
  }]);

  return ManifestListItem;
}(_react["default"].Component);

exports.ManifestListItem = ManifestListItem;
ManifestListItem.defaultProps = {
  active: false,
  buttonRef: undefined,
  classes: {},
  error: null,
  handleClose: function handleClose() {},
  isCollection: false,
  isFetching: false,
  isMultipart: false,
  manifestLogo: null,
  provider: null,
  ready: false,
  size: 0,
  t: function t(key) {
    return key;
  },
  thumbnail: null,
  title: null
};