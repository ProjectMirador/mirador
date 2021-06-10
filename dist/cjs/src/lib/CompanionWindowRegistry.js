"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ThumbnailNavigation = _interopRequireDefault(require("../containers/ThumbnailNavigation"));

var _WindowSideBarAnnotationsPanel = _interopRequireDefault(require("../containers/WindowSideBarAnnotationsPanel"));

var _WindowSideBarInfoPanel = _interopRequireDefault(require("../containers/WindowSideBarInfoPanel"));

var _WindowSideBarCanvasPanel = _interopRequireDefault(require("../containers/WindowSideBarCanvasPanel"));

var _AttributionPanel = _interopRequireDefault(require("../containers/AttributionPanel"));

var _SearchPanel = _interopRequireDefault(require("../containers/SearchPanel"));

var _LayersPanel = _interopRequireDefault(require("../containers/LayersPanel"));

var _CustomPanel = _interopRequireDefault(require("../containers/CustomPanel"));

var _WindowSideBarCollectionPanel = _interopRequireDefault(require("../containers/WindowSideBarCollectionPanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var map = {
  annotations: _WindowSideBarAnnotationsPanel["default"],
  attribution: _AttributionPanel["default"],
  canvas: _WindowSideBarCanvasPanel["default"],
  collection: _WindowSideBarCollectionPanel["default"],
  custom: _CustomPanel["default"],
  info: _WindowSideBarInfoPanel["default"],
  layers: _LayersPanel["default"],
  search: _SearchPanel["default"],
  thumbnailNavigation: _ThumbnailNavigation["default"]
};
var _default = map;
exports["default"] = _default;