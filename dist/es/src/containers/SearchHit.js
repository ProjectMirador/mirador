function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { SearchHit } from '../components/SearchHit';
import * as actions from '../state/actions';
import { getCanvasLabel, getVisibleCanvasIds, getResourceAnnotationForSearchHit, getResourceAnnotationLabel, getSelectedContentSearchAnnotationIds, getSelectedAnnotationId } from '../state/selectors';
/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SearchHit
 * @private
 */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var annotationId = _ref.annotationId,
      _ref$hit = _ref.hit,
      hit = _ref$hit === void 0 ? {
    annotations: []
  } : _ref$hit,
      companionWindowId = _ref.companionWindowId,
      windowId = _ref.windowId;
  var realAnnoId = annotationId || hit.annotations[0];
  var hitAnnotation = getResourceAnnotationForSearchHit(state, {
    annotationUri: realAnnoId,
    companionWindowId: companionWindowId,
    windowId: windowId
  });
  var annotationLabel = getResourceAnnotationLabel(state, {
    annotationUri: realAnnoId,
    companionWindowId: companionWindowId,
    windowId: windowId
  });
  var selectedCanvasIds = getVisibleCanvasIds(state, {
    windowId: windowId
  });
  var selectedContentSearchAnnotationsIds = getSelectedContentSearchAnnotationIds(state, {
    companionWindowId: companionWindowId,
    windowId: windowId
  });
  var windowSelectedAnnotationId = getSelectedAnnotationId(state, {
    windowId: windowId
  });
  var allAnnoIds = [annotationId].concat(_toConsumableArray(hit.annotations));
  return {
    adjacent: selectedCanvasIds.includes(hitAnnotation.targetId),
    annotation: hitAnnotation,
    annotationId: realAnnoId,
    annotationLabel: annotationLabel[0],
    canvasLabel: hitAnnotation && getCanvasLabel(state, {
      canvasId: hitAnnotation.targetId,
      windowId: windowId
    }),
    selected: selectedContentSearchAnnotationsIds[0] && allAnnoIds.includes(selectedContentSearchAnnotationsIds[0]),
    windowSelected: windowSelectedAnnotationId && allAnnoIds.includes(windowSelectedAnnotationId)
  };
};
/**
 * mapDispatchToProps - to hook up connect
 * @memberof SearchPanelNavigation
 * @private
 */


var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var windowId = _ref2.windowId;
  return {
    selectAnnotation: function selectAnnotation() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return dispatch(actions.selectAnnotation.apply(actions, [windowId].concat(args)));
    }
  };
};
/** */


var styles = function styles(theme) {
  return {
    adjacent: {},
    focused: {},
    hitCounter: _objectSpread(_objectSpread({}, theme.typography.subtitle2), {}, {
      backgroundColor: theme.palette.hitCounter["default"],
      height: 30,
      marginRight: theme.spacing(1),
      verticalAlign: 'inherit'
    }),
    inlineButton: {
      '& span': {
        lineHeight: '1.5em'
      },
      margin: 0,
      padding: 0,
      textTransform: 'none'
    },
    listItem: {
      '&$adjacent': {
        '& $hitCounter': {
          backgroundColor: theme.palette.highlights.secondary
        },
        '&$windowSelected': {
          '& $hitCounter': {
            backgroundColor: theme.palette.highlights.primary
          }
        }
      },
      '&$windowSelected': {
        '& $hitCounter': {
          backgroundColor: theme.palette.highlights.primary
        },
        '&$focused': {
          '&:hover': {
            backgroundColor: 'inherit'
          },
          backgroundColor: 'inherit'
        }
      },
      borderBottom: "0.5px solid ".concat(theme.palette.divider),
      paddingRight: 8
    },
    selected: {},
    subtitle: {
      marginBottom: theme.spacing(1.5)
    },
    windowSelected: {}
  };
};

var enhance = compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles), withTranslation(), withPlugins('SearchHit'));
export default enhance(SearchHit);