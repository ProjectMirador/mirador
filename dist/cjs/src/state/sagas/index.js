"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _effects = require("redux-saga/effects");

var _app = _interopRequireDefault(require("./app"));

var _iiif = _interopRequireDefault(require("./iiif"));

var _windows = _interopRequireDefault(require("./windows"));

var _annotations = _interopRequireDefault(require("./annotations"));

var _auth = _interopRequireDefault(require("./auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _marked = /*#__PURE__*/_regenerator["default"].mark(launchSaga);

/** */
function launchSaga(saga) {
  return _regenerator["default"].wrap(function launchSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!true) {
            _context.next = 12;
            break;
          }

          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.call)(saga);

        case 4:
          return _context.abrupt("break", 12);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);

        case 10:
          _context.next = 0;
          break;

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 7]]);
}
/** */


function getRootSaga() {
  var pluginSagas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return /*#__PURE__*/_regenerator["default"].mark(function rootSaga() {
    var sagas;
    return _regenerator["default"].wrap(function rootSaga$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            sagas = [_annotations["default"], _app["default"], _iiif["default"], _windows["default"], _auth["default"]].concat(_toConsumableArray(pluginSagas));
            _context2.next = 3;
            return (0, _effects.all)(sagas.map(function (saga) {
              return (0, _effects.spawn)(launchSaga, saga);
            }));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, rootSaga);
  });
}

var _default = getRootSaga;
exports["default"] = _default;