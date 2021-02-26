function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { MinimalWindow } from '../components/MinimalWindow';
import { getWindowConfig } from '../state/selectors';
/** mapStateToProps */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    allowClose: getWindowConfig(state, {
      windowId: windowId
    }).allowClose,
    allowWindowSideBar: getWindowConfig(state, {
      windowId: windowId
    }).allowWindowSideBar
  };
};
/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */


var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var windowId = _ref2.windowId;
  return {
    removeWindow: function removeWindow() {
      return dispatch(actions.removeWindow(windowId));
    }
  };
};
/**
 * @param theme
 * @returns {{typographyBody: {flexGrow: number, fontSize: number|string},
 * windowTopBarStyle: {minHeight: number, paddingLeft: number, backgroundColor: string}}}
 */


var styles = function styles(theme) {
  return {
    button: {
      marginLeft: 'auto'
    },
    title: _objectSpread(_objectSpread({}, theme.typography.h6), {}, {
      flexGrow: 1,
      paddingLeft: theme.spacing(0.5)
    }),
    window: {
      backgroundColor: theme.palette.shades.dark,
      borderRadius: 0,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: 0,
      overflow: 'hidden',
      width: '100%'
    },
    windowTopBarStyle: {
      backgroundColor: theme.palette.shades.main,
      borderTop: '2px solid transparent',
      minHeight: 32,
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5)
    }
  };
};

var enhance = compose(withTranslation(), withStyles(styles), connect(mapStateToProps, mapDispatchToProps), withPlugins('MinimalWindow'));
export default enhance(MinimalWindow);