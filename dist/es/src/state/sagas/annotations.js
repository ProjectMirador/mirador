import _regeneratorRuntime from "@babel/runtime/regenerator";

var _marked = /*#__PURE__*/_regeneratorRuntime.mark(fetchCanvasAnnotations),
    _marked2 = /*#__PURE__*/_regeneratorRuntime.mark(fetchAnnotations),
    _marked3 = /*#__PURE__*/_regeneratorRuntime.mark(appSaga);

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { all, put, select, takeEvery } from 'redux-saga/effects';
import { requestCanvasAnnotations, receiveAnnotation, requestAnnotation } from '../actions';
import { getAnnotations, getCanvas } from '../selectors';
import ActionTypes from '../actions/action-types';
import MiradorCanvas from '../../lib/MiradorCanvas';
/** Fetch annotations for a given canvas */

export function fetchCanvasAnnotations(_ref) {
  var canvasId, windowId, canvas, annotations, miradorCanvas;
  return _regeneratorRuntime.wrap(function fetchCanvasAnnotations$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          canvasId = _ref.canvasId, windowId = _ref.windowId;
          _context.next = 3;
          return select(getCanvas, {
            canvasId: canvasId,
            windowId: windowId
          });

        case 3:
          canvas = _context.sent;
          _context.next = 6;
          return select(getAnnotations);

        case 6:
          annotations = _context.sent;
          miradorCanvas = new MiradorCanvas(canvas);
          _context.next = 10;
          return all([].concat(_toConsumableArray(miradorCanvas.annotationListUris.filter(function (uri) {
            return !(annotations[canvas.id] && annotations[canvas.id][uri]);
          }).map(function (uri) {
            return put(requestAnnotation(canvas.id, uri));
          })), _toConsumableArray(miradorCanvas.canvasAnnotationPages.filter(function (annotation) {
            return !(annotations[canvas.id] && annotations[canvas.id][annotation.id]);
          }).map(function (annotation) {
            // If there are no items, try to retrieve the referenced resource.
            // otherwise the resource should be embedded and just add to the store.
            if (!annotation.items) {
              return put(requestAnnotation(canvas.id, annotation.id));
            }

            return put(receiveAnnotation(canvas.id, annotation.id, annotation));
          }))));

        case 10:
          return _context.abrupt("return", _context.sent);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
/**
 * Fetch annotations for the visible canvases.
 */

export function fetchAnnotations(_ref2) {
  var _ref2$visibleCanvases, visibleCanvases, windowId;

  return _regeneratorRuntime.wrap(function fetchAnnotations$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _ref2$visibleCanvases = _ref2.visibleCanvases, visibleCanvases = _ref2$visibleCanvases === void 0 ? [] : _ref2$visibleCanvases, windowId = _ref2.windowId;
          _context2.next = 3;
          return all(visibleCanvases.map(function (canvasId) {
            return put(requestCanvasAnnotations(windowId, canvasId));
          }));

        case 3:
          return _context2.abrupt("return", _context2.sent);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}
/** */

export default function appSaga() {
  return _regeneratorRuntime.wrap(function appSaga$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return all([takeEvery(ActionTypes.REQUEST_CANVAS_ANNOTATIONS, fetchCanvasAnnotations), takeEvery(ActionTypes.SET_CANVAS, fetchAnnotations)]);

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}