function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../state/actions';
import { getCanvasLabel, getLayers, getSortedLayers } from '../state/selectors';
import { CanvasLayers } from '../components/CanvasLayers';
/** For connect */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var canvasId = _ref.canvasId,
      windowId = _ref.windowId;
  return {
    label: getCanvasLabel(state, {
      canvasId: canvasId,
      windowId: windowId
    }),
    layerMetadata: getLayers(state, {
      canvasId: canvasId,
      windowId: windowId
    }),
    layers: getSortedLayers(state, {
      canvasId: canvasId,
      windowId: windowId
    })
  };
};
/**
 * mapDispatchToProps - to hook up connect
 * @memberof WindowSideBarAnnotationsPanel
 * @private
 */


var mapDispatchToProps = {
  updateLayers: actions.updateLayers
};
/** For withStlyes */

var styles = function styles(theme) {
  return {
    dragging: {},
    dragHandle: {
      alignItems: 'center',
      borderRight: "0.5px solid ".concat(theme.palette.divider),
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      marginBottom: -1 * theme.spacing(2) + 0.5,
      marginRight: theme.spacing(1),
      marginTop: -1 * theme.spacing(2),
      maxWidth: theme.spacing(3),
      width: theme.spacing(3)
    },
    image: {
      borderBottom: "1px solid ".concat(theme.palette.divider)
    },
    label: {
      paddingLeft: theme.spacing(1)
    },
    list: {
      paddingTop: 0
    },
    listItem: {
      '& $dragHandle': {
        '&:hover': {
          backgroundColor: theme.palette.action.hover
        },
        backgroundColor: theme.palette.shades.light
      },
      '&$dragging': {
        '& $dragHandle, & $dragHandle:hover': {
          backgroundColor: theme.palette.action.selected
        },
        backgroundColor: theme.palette.action.hover
      },
      alignItems: 'stretch',
      borderBottom: "0.5px solid ".concat(theme.palette.divider),
      cursor: 'pointer',
      paddingBottom: theme.spacing(2),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(2)
    },
    opacityIcon: {
      marginRight: theme.spacing(0.5)
    },
    opacityInput: _objectSpread(_objectSpread({}, theme.typography.caption), {}, {
      '&::-webkit-outer-spin-button,&::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0
      },
      '-moz-appearance': 'textfield',
      textAlign: 'right',
      width: '3ch'
    }),
    sectionHeading: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(2)
    },
    slider: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      maxWidth: 150
    },
    thumbnail: {
      minWidth: 50
    }
  };
};

var enhance = compose(withTranslation(), withStyles(styles), connect(mapStateToProps, mapDispatchToProps));
export default enhance(CanvasLayers);