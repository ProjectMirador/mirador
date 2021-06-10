"use strict";

var _regeneratorRuntime2 = require("@babel/runtime/regenerator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchWindowManifest = fetchWindowManifest;
exports.setCanvasOnNewSequence = setCanvasOnNewSequence;
exports.setCollectionPath = setCollectionPath;
exports.fetchCollectionManifests = fetchCollectionManifests;
exports.setWindowStartingCanvas = setWindowStartingCanvas;
exports.setWindowDefaultSearchQuery = setWindowDefaultSearchQuery;
exports.getAnnotationsBySearch = getAnnotationsBySearch;
exports.setCurrentAnnotationsOnCurrentCanvas = setCurrentAnnotationsOnCurrentCanvas;
exports.panToFocusedWindow = panToFocusedWindow;
exports.updateVisibleCanvases = updateVisibleCanvases;
exports.setCanvasOfFirstSearchResult = setCanvasOfFirstSearchResult;
exports.setCanvasforSelectedAnnotation = setCanvasforSelectedAnnotation;
exports.fetchInfoResponses = fetchInfoResponses;
exports.determineAndShowCollectionDialog = determineAndShowCollectionDialog;
exports["default"] = windowsSaga;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _effects = require("redux-saga/effects");

var _actionTypes = _interopRequireDefault(require("../actions/action-types"));

var _MiradorManifest = _interopRequireDefault(require("../../lib/MiradorManifest"));

var _MiradorCanvas = _interopRequireDefault(require("../../lib/MiradorCanvas"));

var _actions = require("../actions");

var _selectors = require("../selectors");

var _iiif = require("./iiif");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked = /*#__PURE__*/_regeneratorRuntime2.mark(fetchWindowManifest),
    _marked2 = /*#__PURE__*/_regeneratorRuntime2.mark(setCanvasOnNewSequence),
    _marked3 = /*#__PURE__*/_regeneratorRuntime2.mark(setCollectionPath),
    _marked4 = /*#__PURE__*/_regeneratorRuntime2.mark(fetchCollectionManifests),
    _marked5 = /*#__PURE__*/_regeneratorRuntime2.mark(setWindowStartingCanvas),
    _marked6 = /*#__PURE__*/_regeneratorRuntime2.mark(setWindowDefaultSearchQuery),
    _marked7 = /*#__PURE__*/_regeneratorRuntime2.mark(setCurrentAnnotationsOnCurrentCanvas),
    _marked8 = /*#__PURE__*/_regeneratorRuntime2.mark(panToFocusedWindow),
    _marked9 = /*#__PURE__*/_regeneratorRuntime2.mark(updateVisibleCanvases),
    _marked10 = /*#__PURE__*/_regeneratorRuntime2.mark(setCanvasOfFirstSearchResult),
    _marked11 = /*#__PURE__*/_regeneratorRuntime2.mark(setCanvasforSelectedAnnotation),
    _marked12 = /*#__PURE__*/_regeneratorRuntime2.mark(fetchInfoResponses),
    _marked13 = /*#__PURE__*/_regeneratorRuntime2.mark(determineAndShowCollectionDialog),
    _marked14 = /*#__PURE__*/_regeneratorRuntime2.mark(windowsSaga);

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/** */
function fetchWindowManifest(action) {
  var _ref, collectionPath, id, manifestId;

  return _regenerator["default"].wrap(function fetchWindowManifest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref = action.payload || action.window, collectionPath = _ref.collectionPath, id = _ref.id, manifestId = _ref.manifestId;

          if (manifestId) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return");

        case 3:
          if (!action.manifest) {
            _context.next = 8;
            break;
          }

          _context.next = 6;
          return (0, _effects.put)((0, _actions.receiveManifest)(manifestId, action.manifest));

        case 6:
          _context.next = 10;
          break;

        case 8:
          _context.next = 10;
          return _effects.call.apply(void 0, [_iiif.fetchManifests, manifestId].concat(_toConsumableArray(collectionPath || [])));

        case 10:
          _context.next = 12;
          return (0, _effects.call)(setWindowStartingCanvas, action);

        case 12:
          _context.next = 14;
          return (0, _effects.call)(setWindowDefaultSearchQuery, action);

        case 14:
          if (collectionPath) {
            _context.next = 17;
            break;
          }

          _context.next = 17;
          return (0, _effects.call)(setCollectionPath, {
            manifestId: manifestId,
            windowId: action.id || action.window.id
          });

        case 17:
          _context.next = 19;
          return (0, _effects.call)(determineAndShowCollectionDialog, manifestId, id);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
/** */


function setCanvasOnNewSequence(action) {
  var windowId, canvases, thunk;
  return _regenerator["default"].wrap(function setCanvasOnNewSequence$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          windowId = action.id;

          if (!(!action || !action.payload || !action.payload.sequenceId)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return");

        case 3:
          _context2.next = 5;
          return (0, _effects.select)(_selectors.getCanvases, {
            windowId: windowId
          });

        case 5:
          canvases = _context2.sent;

          if (!(!canvases || !canvases[0] || !canvases[0].id)) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return");

        case 8:
          _context2.next = 10;
          return (0, _effects.call)(_actions.setCanvas, windowId, canvases[0].id);

        case 10:
          thunk = _context2.sent;
          _context2.next = 13;
          return (0, _effects.put)(thunk);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}
/** */


function setCollectionPath(_ref2) {
  var manifestId, windowId, manifestoInstance, partOfs, partOf;
  return _regenerator["default"].wrap(function setCollectionPath$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          manifestId = _ref2.manifestId, windowId = _ref2.windowId;
          _context3.next = 3;
          return (0, _effects.select)(_selectors.getManifestoInstance, {
            manifestId: manifestId
          });

        case 3:
          manifestoInstance = _context3.sent;

          if (!manifestoInstance) {
            _context3.next = 10;
            break;
          }

          partOfs = manifestoInstance.getProperty('partOf');
          partOf = Array.isArray(partOfs) ? partOfs[0] : partOfs;

          if (!(partOf && partOf.id)) {
            _context3.next = 10;
            break;
          }

          _context3.next = 10;
          return (0, _effects.put)((0, _actions.updateWindow)(windowId, {
            collectionPath: [partOf.id]
          }));

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}
/** */


function fetchCollectionManifests(action) {
  var collectionPath;
  return _regenerator["default"].wrap(function fetchCollectionManifests$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          collectionPath = action.payload.collectionPath;

          if (collectionPath) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return");

        case 3:
          _context4.next = 5;
          return _effects.call.apply(void 0, [_iiif.fetchManifests].concat(_toConsumableArray(collectionPath)));

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
}
/** @private */


function setWindowStartingCanvas(action) {
  var _ref3, canvasId, canvasIndex, manifestId, windowId, thunk, manifestoInstance, miradorManifest, startCanvas, _thunk;

  return _regenerator["default"].wrap(function setWindowStartingCanvas$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _ref3 = action.payload || action.window, canvasId = _ref3.canvasId, canvasIndex = _ref3.canvasIndex, manifestId = _ref3.manifestId;
          windowId = action.id || action.window.id;

          if (!canvasId) {
            _context5.next = 10;
            break;
          }

          _context5.next = 5;
          return (0, _effects.call)(_actions.setCanvas, windowId, canvasId, null, {
            preserveViewport: !!action.payload
          });

        case 5:
          thunk = _context5.sent;
          _context5.next = 8;
          return (0, _effects.put)(thunk);

        case 8:
          _context5.next = 22;
          break;

        case 10:
          _context5.next = 12;
          return (0, _effects.select)(_selectors.getManifestoInstance, {
            manifestId: manifestId
          });

        case 12:
          manifestoInstance = _context5.sent;

          if (!manifestoInstance) {
            _context5.next = 22;
            break;
          }

          // set the startCanvas
          miradorManifest = new _MiradorManifest["default"](manifestoInstance);
          startCanvas = miradorManifest.startCanvas || miradorManifest.canvasAt(canvasIndex || 0) || miradorManifest.canvasAt(0);

          if (!startCanvas) {
            _context5.next = 22;
            break;
          }

          _context5.next = 19;
          return (0, _effects.call)(_actions.setCanvas, windowId, startCanvas.id);

        case 19:
          _thunk = _context5.sent;
          _context5.next = 22;
          return (0, _effects.put)(_thunk);

        case 22:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5);
}
/** @private */


function setWindowDefaultSearchQuery(action) {
  var _action$window, windowId, defaultSearchQuery, searchService, companionWindowIds, companionWindowId, searchId;

  return _regenerator["default"].wrap(function setWindowDefaultSearchQuery$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (!(!action.window || !action.window.defaultSearchQuery)) {
            _context6.next = 2;
            break;
          }

          return _context6.abrupt("return");

        case 2:
          _action$window = action.window, windowId = _action$window.id, defaultSearchQuery = _action$window.defaultSearchQuery;
          _context6.next = 5;
          return (0, _effects.select)(_selectors.getManifestSearchService, {
            windowId: windowId
          });

        case 5:
          searchService = _context6.sent;
          _context6.next = 8;
          return (0, _effects.select)(_selectors.getCompanionWindowIdsForPosition, {
            position: 'left',
            windowId: windowId
          });

        case 8:
          companionWindowIds = _context6.sent;
          companionWindowId = companionWindowIds[0];

          if (!(searchService && companionWindowId)) {
            _context6.next = 14;
            break;
          }

          searchId = searchService && "".concat(searchService.id, "?q=").concat(defaultSearchQuery);
          _context6.next = 14;
          return (0, _effects.put)((0, _actions.fetchSearch)(windowId, companionWindowId, searchId, defaultSearchQuery));

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6);
}
/** @private */


function getAnnotationsBySearch(state, _ref4) {
  var canvasIds = _ref4.canvasIds,
      companionWindowIds = _ref4.companionWindowIds,
      windowId = _ref4.windowId;
  var annotationBySearch = companionWindowIds.reduce(function (accumulator, companionWindowId) {
    var annotations = (0, _selectors.getSearchAnnotationsForCompanionWindow)(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    });
    var resourceAnnotations = annotations.resources;
    var hitAnnotation = resourceAnnotations.find(function (r) {
      return canvasIds.includes(r.targetId);
    });
    if (hitAnnotation) accumulator[companionWindowId] = [hitAnnotation.id];
    return accumulator;
  }, {});
  return annotationBySearch;
}
/** @private */


function setCurrentAnnotationsOnCurrentCanvas(_ref5) {
  var annotationId, windowId, visibleCanvases, searches, companionWindowIds, annotationBySearch;
  return _regenerator["default"].wrap(function setCurrentAnnotationsOnCurrentCanvas$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          annotationId = _ref5.annotationId, windowId = _ref5.windowId, visibleCanvases = _ref5.visibleCanvases;
          _context7.next = 3;
          return (0, _effects.select)(_selectors.getSearchForWindow, {
            windowId: windowId
          });

        case 3:
          searches = _context7.sent;
          companionWindowIds = Object.keys(searches || {});

          if (!(companionWindowIds.length === 0)) {
            _context7.next = 7;
            break;
          }

          return _context7.abrupt("return");

        case 7:
          _context7.next = 9;
          return (0, _effects.select)(getAnnotationsBySearch, {
            canvasIds: visibleCanvases,
            companionWindowIds: companionWindowIds,
            windowId: windowId
          });

        case 9:
          annotationBySearch = _context7.sent;
          _context7.next = 12;
          return (0, _effects.all)(Object.keys(annotationBySearch).map(function (companionWindowId) {
            return (0, _effects.put)((0, _actions.setContentSearchCurrentAnnotation)(windowId, companionWindowId, annotationBySearch[companionWindowId]));
          }));

        case 12:
          if (!(Object.values(annotationBySearch).length > 0)) {
            _context7.next = 15;
            break;
          }

          _context7.next = 15;
          return (0, _effects.put)((0, _actions.selectAnnotation)(windowId, Object.values(annotationBySearch)[0][0]));

        case 15:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7);
}
/** @private */


function panToFocusedWindow(_ref6) {
  var pan, windowId, elasticLayout, _ref7, x, y, width, height, _yield$select, _yield$select$viewpor, viewWidth, viewHeight;

  return _regenerator["default"].wrap(function panToFocusedWindow$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          pan = _ref6.pan, windowId = _ref6.windowId;

          if (pan) {
            _context8.next = 3;
            break;
          }

          return _context8.abrupt("return");

        case 3:
          _context8.next = 5;
          return (0, _effects.select)(_selectors.getElasticLayout);

        case 5:
          elasticLayout = _context8.sent;
          _ref7 = elasticLayout[windowId] || {}, x = _ref7.x, y = _ref7.y, width = _ref7.width, height = _ref7.height;
          _context8.next = 9;
          return (0, _effects.select)(_selectors.getWorkspace);

        case 9:
          _yield$select = _context8.sent;
          _yield$select$viewpor = _yield$select.viewportPosition;
          viewWidth = _yield$select$viewpor.width;
          viewHeight = _yield$select$viewpor.height;
          _context8.next = 15;
          return (0, _effects.put)((0, _actions.setWorkspaceViewportPosition)({
            x: x + width / 2 - viewWidth / 2,
            y: y + height / 2 - viewHeight / 2
          }));

        case 15:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked8);
}
/** @private */


function updateVisibleCanvases(_ref8) {
  var windowId, _yield$select2, canvasId, visibleCanvases;

  return _regenerator["default"].wrap(function updateVisibleCanvases$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          windowId = _ref8.windowId;
          _context9.next = 3;
          return (0, _effects.select)(_selectors.getWindow, {
            windowId: windowId
          });

        case 3:
          _yield$select2 = _context9.sent;
          canvasId = _yield$select2.canvasId;
          _context9.next = 7;
          return (0, _effects.select)(_selectors.getCanvasGrouping, {
            canvasId: canvasId,
            windowId: windowId
          });

        case 7:
          visibleCanvases = _context9.sent;
          _context9.next = 10;
          return (0, _effects.put)((0, _actions.updateWindow)(windowId, {
            visibleCanvases: (visibleCanvases || []).map(function (c) {
              return c.id;
            })
          }));

        case 10:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked9);
}
/** @private */


function setCanvasOfFirstSearchResult(_ref9) {
  var companionWindowId, windowId, selectedIds, annotations;
  return _regenerator["default"].wrap(function setCanvasOfFirstSearchResult$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          companionWindowId = _ref9.companionWindowId, windowId = _ref9.windowId;
          _context10.next = 3;
          return (0, _effects.select)(_selectors.getSelectedContentSearchAnnotationIds, {
            companionWindowId: companionWindowId,
            windowId: windowId
          });

        case 3:
          selectedIds = _context10.sent;

          if (!(selectedIds.length !== 0)) {
            _context10.next = 6;
            break;
          }

          return _context10.abrupt("return");

        case 6:
          _context10.next = 8;
          return (0, _effects.select)(_selectors.getSortedSearchAnnotationsForCompanionWindow, {
            companionWindowId: companionWindowId,
            windowId: windowId
          });

        case 8:
          annotations = _context10.sent;

          if (!(!annotations || annotations.length === 0)) {
            _context10.next = 11;
            break;
          }

          return _context10.abrupt("return");

        case 11:
          _context10.next = 13;
          return (0, _effects.put)((0, _actions.selectAnnotation)(windowId, annotations[0].id));

        case 13:
        case "end":
          return _context10.stop();
      }
    }
  }, _marked10);
}
/** @private */


function setCanvasforSelectedAnnotation(_ref10) {
  var annotationId, windowId, canvasIds, canvas, thunk;
  return _regenerator["default"].wrap(function setCanvasforSelectedAnnotation$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          annotationId = _ref10.annotationId, windowId = _ref10.windowId;
          _context11.next = 3;
          return (0, _effects.select)(_selectors.getVisibleCanvasIds, {
            windowId: windowId
          });

        case 3:
          canvasIds = _context11.sent;
          _context11.next = 6;
          return (0, _effects.select)(_selectors.getCanvasForAnnotation, {
            annotationId: annotationId,
            windowId: windowId
          });

        case 6:
          canvas = _context11.sent;

          if (!(!canvas || canvasIds.includes(canvas.id))) {
            _context11.next = 9;
            break;
          }

          return _context11.abrupt("return");

        case 9:
          _context11.next = 11;
          return (0, _effects.call)(_actions.setCanvas, windowId, canvas.id);

        case 11:
          thunk = _context11.sent;
          _context11.next = 14;
          return (0, _effects.put)(thunk);

        case 14:
        case "end":
          return _context11.stop();
      }
    }
  }, _marked11);
}
/** Fetch info responses for the visible canvases */


function fetchInfoResponses(_ref11) {
  var visibleCanvasIds, windowId, canvases, infoResponses, visibleCanvases;
  return _regenerator["default"].wrap(function fetchInfoResponses$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          visibleCanvasIds = _ref11.visibleCanvases, windowId = _ref11.windowId;
          _context12.next = 3;
          return (0, _effects.select)(_selectors.getCanvases, {
            windowId: windowId
          });

        case 3:
          canvases = _context12.sent;
          _context12.next = 6;
          return (0, _effects.select)(_selectors.selectInfoResponses);

        case 6:
          infoResponses = _context12.sent;
          visibleCanvases = (canvases || []).filter(function (c) {
            return visibleCanvasIds.includes(c.id);
          });
          _context12.next = 10;
          return (0, _effects.all)(visibleCanvases.map(function (canvas) {
            var miradorCanvas = new _MiradorCanvas["default"](canvas);
            return (0, _effects.all)(miradorCanvas.iiifImageResources.map(function (imageResource) {
              return !infoResponses[imageResource.getServices()[0].id] && (0, _effects.put)((0, _actions.fetchInfoResponse)({
                imageResource: imageResource,
                windowId: windowId
              }));
            }).filter(Boolean));
          }));

        case 10:
        case "end":
          return _context12.stop();
      }
    }
  }, _marked12);
}
/** */


function determineAndShowCollectionDialog(manifestId, windowId) {
  var manifestoInstance;
  return _regenerator["default"].wrap(function determineAndShowCollectionDialog$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return (0, _effects.select)(_selectors.getManifestoInstance, {
            manifestId: manifestId
          });

        case 2:
          manifestoInstance = _context13.sent;

          if (!(manifestoInstance && manifestoInstance.isCollection())) {
            _context13.next = 6;
            break;
          }

          _context13.next = 6;
          return (0, _effects.put)((0, _actions.showCollectionDialog)(manifestId, [], windowId));

        case 6:
        case "end":
          return _context13.stop();
      }
    }
  }, _marked13);
}
/** */


function windowsSaga() {
  return _regenerator["default"].wrap(function windowsSaga$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return (0, _effects.all)([(0, _effects.takeEvery)(_actionTypes["default"].ADD_WINDOW, fetchWindowManifest), (0, _effects.takeEvery)(_actionTypes["default"].UPDATE_WINDOW, fetchWindowManifest), (0, _effects.takeEvery)(_actionTypes["default"].UPDATE_WINDOW, setCanvasOnNewSequence), (0, _effects.takeEvery)(_actionTypes["default"].SET_CANVAS, setCurrentAnnotationsOnCurrentCanvas), (0, _effects.takeEvery)(_actionTypes["default"].SET_CANVAS, fetchInfoResponses), (0, _effects.takeEvery)(_actionTypes["default"].UPDATE_COMPANION_WINDOW, fetchCollectionManifests), (0, _effects.takeEvery)(_actionTypes["default"].SET_WINDOW_VIEW_TYPE, updateVisibleCanvases), (0, _effects.takeEvery)(_actionTypes["default"].RECEIVE_SEARCH, setCanvasOfFirstSearchResult), (0, _effects.takeEvery)(_actionTypes["default"].SELECT_ANNOTATION, setCanvasforSelectedAnnotation), (0, _effects.takeEvery)(_actionTypes["default"].FOCUS_WINDOW, panToFocusedWindow)]);

        case 2:
        case "end":
          return _context14.stop();
      }
    }
  }, _marked14);
}