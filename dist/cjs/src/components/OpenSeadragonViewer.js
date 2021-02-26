"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSeadragonViewer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _openseadragon = _interopRequireDefault(require("openseadragon"));

var _classnames = _interopRequireDefault(require("classnames"));

var _cssNs = _interopRequireDefault(require("../config/css-ns"));

var _AnnotationsOverlay = _interopRequireDefault(require("../containers/AnnotationsOverlay"));

var _CanvasWorld = _interopRequireDefault(require("../lib/CanvasWorld"));

var _PluginHook = require("./PluginHook");

var _OSDReferences = require("../plugins/OSDReferences");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

/**
 * Represents a OpenSeadragonViewer in the mirador workspace. Responsible for mounting
 * and rendering OSD.
 */
var OpenSeadragonViewer = /*#__PURE__*/function (_Component) {
  _inherits(OpenSeadragonViewer, _Component);

  var _super = _createSuper(OpenSeadragonViewer);

  /**
   * @param {Object} props
   */
  function OpenSeadragonViewer(props) {
    var _this;

    _classCallCheck(this, OpenSeadragonViewer);

    _this = _super.call(this, props);
    _this.state = {
      viewer: undefined
    };
    _this.ref = /*#__PURE__*/_react["default"].createRef();
    _this.apiRef = /*#__PURE__*/_react["default"].createRef();

    _OSDReferences.OSDReferences.set(props.windowId, _this.apiRef);

    _this.onCanvasMouseMove = (0, _debounce["default"])(_this.onCanvasMouseMove.bind(_assertThisInitialized(_this)), 10);
    _this.onViewportChange = _this.onViewportChange.bind(_assertThisInitialized(_this));
    _this.zoomToWorld = _this.zoomToWorld.bind(_assertThisInitialized(_this));
    _this.osdUpdating = false;
    return _this;
  }
  /**
   * React lifecycle event
   */


  _createClass(OpenSeadragonViewer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props = this.props,
          osdConfig = _this$props.osdConfig,
          t = _this$props.t,
          windowId = _this$props.windowId;

      if (!this.ref.current) {
        return;
      }

      var viewer = new _openseadragon["default"](_objectSpread({
        id: this.ref.current.id
      }, osdConfig));
      var canvas = viewer.canvas && viewer.canvas.firstElementChild;

      if (canvas) {
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label', t('digitizedView'));
        canvas.setAttribute('aria-describedby', "".concat(windowId, "-osd"));
      }

      this.apiRef.current = viewer;
      this.setState({
        viewer: viewer
      }); // Set a flag when OSD starts animating (so that viewer updates are not used)

      viewer.addHandler('animation-start', function () {
        _this2.osdUpdating = true;
      });
      viewer.addHandler('animation-finish', this.onViewportChange);
      viewer.addHandler('animation-finish', function () {
        _this2.osdUpdating = false;
      });

      if (viewer.innerTracker) {
        viewer.innerTracker.moveHandler = this.onCanvasMouseMove;
      }
    }
    /**
     * When the tileSources change, make sure to close the OSD viewer.
     * When the annotations change, reset the updateCanvas method to make sure
     * they are added.
     * When the viewport state changes, pan or zoom the OSD viewer as appropriate
     */

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$props2 = this.props,
          viewerConfig = _this$props2.viewerConfig,
          canvasWorld = _this$props2.canvasWorld;
      var viewer = this.state.viewer;
      this.apiRef.current = viewer;

      if (prevState.viewer === undefined) {
        if (viewerConfig) {
          viewer.viewport.panTo(viewerConfig, true);
          viewer.viewport.zoomTo(viewerConfig.zoom, viewerConfig, true);
          viewerConfig.degrees !== undefined && viewer.viewport.setRotation(viewerConfig.degrees);
          viewerConfig.flip !== undefined && viewer.viewport.setFlip(viewerConfig.flip);
        }

        this.addAllImageSources(!viewerConfig);
        return;
      }

      if (!this.infoResponsesMatch(prevProps.infoResponses) || !this.nonTiledImagedMatch(prevProps.nonTiledImages)) {
        viewer.close();
        var canvasesChanged = !(0, _isEqual["default"])(canvasWorld.canvasIds, prevProps.canvasWorld.canvasIds);
        this.addAllImageSources(canvasesChanged || !viewerConfig);
      } else if (!(0, _isEqual["default"])(canvasWorld.layers, prevProps.canvasWorld.layers)) {
        this.refreshTileProperties();
      } else if (viewerConfig && !this.osdUpdating) {
        var viewport = viewer.viewport;

        if (viewerConfig.x !== viewport.centerSpringX.target.value || viewerConfig.y !== viewport.centerSpringY.target.value) {
          viewport.panTo(viewerConfig, false);
        }

        if (viewerConfig.zoom !== viewport.zoomSpring.target.value) {
          viewport.zoomTo(viewerConfig.zoom, viewerConfig, false);
        }

        if (viewerConfig.rotation !== viewport.getRotation()) {
          viewport.setRotation(viewerConfig.rotation);
        }

        if (viewerConfig.flip !== viewport.getFlip()) {
          viewport.setFlip(viewerConfig.flip);
        }
      }
    }
    /**
     */

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var viewer = this.state.viewer;

      if (viewer.innerTracker && viewer.innerTracker.moveHandler === this.onCanvasMouseMove) {
        viewer.innerTracker.moveHandler = null;
      }

      viewer.removeAllHandlers();
      this.apiRef.current = undefined;
    }
    /** Shim to provide a mouse-move event coming from the viewer */

  }, {
    key: "onCanvasMouseMove",
    value: function onCanvasMouseMove(event) {
      var viewer = this.state.viewer;
      viewer.raiseEvent('mouse-move', event);
    }
    /**
     * Forward OSD state to redux
     */

  }, {
    key: "onViewportChange",
    value: function onViewportChange(event) {
      var _this$props3 = this.props,
          updateViewport = _this$props3.updateViewport,
          windowId = _this$props3.windowId;
      var viewport = event.eventSource.viewport;
      updateViewport(windowId, {
        flip: viewport.getFlip(),
        rotation: viewport.getRotation(),
        x: Math.round(viewport.centerSpringX.target.value),
        y: Math.round(viewport.centerSpringY.target.value),
        zoom: viewport.zoomSpring.target.value
      });
    }
    /** */

  }, {
    key: "addAllImageSources",
    value: function addAllImageSources() {
      var _this3 = this;

      var zoomAfterAdd = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var _this$props4 = this.props,
          nonTiledImages = _this$props4.nonTiledImages,
          infoResponses = _this$props4.infoResponses;
      Promise.all(infoResponses.map(function (infoResponse) {
        return _this3.addTileSource(infoResponse);
      }), nonTiledImages.map(function (image) {
        return _this3.addNonTiledImage(image);
      })).then(function () {
        if (infoResponses[0] || nonTiledImages[0]) {
          if (zoomAfterAdd) _this3.zoomToWorld();

          _this3.refreshTileProperties();
        }
      });
    }
    /** */

  }, {
    key: "addNonTiledImage",
    value: function addNonTiledImage(contentResource) {
      var canvasWorld = this.props.canvasWorld;
      var viewer = this.state.viewer;
      var type = contentResource.getProperty('type');
      var format = contentResource.getProperty('format') || '';
      if (!(type === 'Image' || type === 'dctypes:Image' || format.startsWith('image/'))) return Promise.resolve();
      return new Promise(function (resolve, reject) {
        if (!viewer) {
          reject();
        }

        viewer.addSimpleImage({
          error: function error(event) {
            return reject(event);
          },
          fitBounds: _construct(_openseadragon["default"].Rect, _toConsumableArray(canvasWorld.contentResourceToWorldCoordinates(contentResource))),
          index: canvasWorld.layerIndexOfImageResource(contentResource),
          opacity: canvasWorld.layerOpacityOfImageResource(contentResource),
          success: function success(event) {
            return resolve(event);
          },
          url: contentResource.id
        });
      });
    }
    /**
     */

  }, {
    key: "addTileSource",
    value: function addTileSource(infoResponse) {
      var canvasWorld = this.props.canvasWorld;
      var viewer = this.state.viewer;
      return new Promise(function (resolve, reject) {
        if (!viewer) {
          reject();
        } // OSD mutates this object, so we give it a shallow copy


        var tileSource = _objectSpread({}, infoResponse.json);

        var contentResource = canvasWorld.contentResource(infoResponse.id);
        if (!contentResource) return;
        viewer.addTiledImage({
          error: function error(event) {
            return reject(event);
          },
          fitBounds: _construct(_openseadragon["default"].Rect, _toConsumableArray(canvasWorld.contentResourceToWorldCoordinates(contentResource))),
          index: canvasWorld.layerIndexOfImageResource(contentResource),
          opacity: canvasWorld.layerOpacityOfImageResource(contentResource),
          success: function success(event) {
            return resolve(event);
          },
          tileSource: tileSource
        });
      });
    }
    /** */

  }, {
    key: "refreshTileProperties",
    value: function refreshTileProperties() {
      var canvasWorld = this.props.canvasWorld;
      var world = this.state.viewer.world;
      var items = [];

      for (var i = 0; i < world.getItemCount(); i += 1) {
        items.push(world.getItemAt(i));
      }

      items.forEach(function (item, i) {
        var contentResource = canvasWorld.contentResource(item.source['@id'] || item.source.id);
        if (!contentResource) return;
        var newIndex = canvasWorld.layerIndexOfImageResource(contentResource);
        if (i !== newIndex) world.setItemIndex(item, newIndex);
        item.setOpacity(canvasWorld.layerOpacityOfImageResource(contentResource));
      });
    }
    /**
     */

  }, {
    key: "fitBounds",
    value: function fitBounds(x, y, w, h) {
      var immediately = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var viewer = this.state.viewer;
      viewer.viewport.fitBounds(new _openseadragon["default"].Rect(x, y, w, h), immediately);
    }
    /**
     * infoResponsesMatch - compares previous tileSources to current to determine
     * whether a refresh of the OSD viewer is needed.
     * @param  {Array} prevTileSources
     * @return {Boolean}
     */

  }, {
    key: "infoResponsesMatch",
    value: function infoResponsesMatch(prevInfoResponses) {
      var infoResponses = this.props.infoResponses;
      if (infoResponses.length === 0 && prevInfoResponses.length === 0) return true;
      if (infoResponses.length !== prevInfoResponses.length) return false;
      return infoResponses.every(function (infoResponse, index) {
        if (!prevInfoResponses[index]) {
          return false;
        }

        if (!infoResponse.json || !prevInfoResponses[index].json) {
          return false;
        }

        if (infoResponse.tokenServiceId !== prevInfoResponses[index].tokenServiceId) {
          return false;
        }

        if (infoResponse.json['@id'] && infoResponse.json['@id'] === prevInfoResponses[index].json['@id']) {
          return true;
        }

        if (infoResponse.json.id && infoResponse.json.id === prevInfoResponses[index].json.id) {
          return true;
        }

        return false;
      });
    }
    /**
     * nonTiledImagedMatch - compares previous images to current to determin
     * whether a refresh of the OSD viewer is needed
     */

  }, {
    key: "nonTiledImagedMatch",
    value: function nonTiledImagedMatch(prevNonTiledImages) {
      var nonTiledImages = this.props.nonTiledImages;
      if (nonTiledImages.length === 0 && prevNonTiledImages.length === 0) return true;
      return nonTiledImages.some(function (image, index) {
        if (!prevNonTiledImages[index]) {
          return false;
        }

        if (image.id === prevNonTiledImages[index].id) {
          return true;
        }

        return false;
      });
    }
    /**
     * zoomToWorld - zooms the viewer to the extent of the canvas world
     */

  }, {
    key: "zoomToWorld",
    value: function zoomToWorld() {
      var immediately = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var canvasWorld = this.props.canvasWorld;
      this.fitBounds.apply(this, _toConsumableArray(canvasWorld.worldBounds()).concat([immediately]));
    }
    /**
     * Renders things
     */

  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props5 = this.props,
          children = _this$props5.children,
          classes = _this$props5.classes,
          label = _this$props5.label,
          t = _this$props5.t,
          windowId = _this$props5.windowId,
          drawAnnotations = _this$props5.drawAnnotations;
      var viewer = this.state.viewer;

      var enhancedChildren = _react["default"].Children.map(children, function (child) {
        return /*#__PURE__*/_react["default"].cloneElement(child, {
          zoomToWorld: _this4.zoomToWorld
        });
      });

      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("section", {
        className: (0, _classnames["default"])((0, _cssNs["default"])('osd-container'), classes.osdContainer),
        id: "".concat(windowId, "-osd"),
        ref: this.ref,
        "aria-label": t('item', {
          label: label
        }),
        "aria-live": "polite"
      }, drawAnnotations && /*#__PURE__*/_react["default"].createElement(_AnnotationsOverlay["default"], {
        viewer: viewer,
        windowId: windowId
      }), enhancedChildren, /*#__PURE__*/_react["default"].createElement(_PluginHook.PluginHook, Object.assign({
        viewer: viewer
      }, _objectSpread(_objectSpread({}, this.props), {}, {
        children: null
      })))));
    }
  }]);

  return OpenSeadragonViewer;
}(_react.Component);

exports.OpenSeadragonViewer = OpenSeadragonViewer;
OpenSeadragonViewer.defaultProps = {
  children: null,
  drawAnnotations: false,
  infoResponses: [],
  label: null,
  nonTiledImages: [],
  osdConfig: {},
  viewerConfig: null
};