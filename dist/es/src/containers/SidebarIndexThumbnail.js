function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { SidebarIndexThumbnail } from '../components/SidebarIndexThumbnail';
import { getConfig, getWindow } from '../state/selectors';
/**
 * mapStateToProps - used to hook up state to props
 * @memberof SidebarIndexThumbnail
 * @private
 */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  var window = getWindow(state, {
    windowId: windowId
  });
  return _objectSpread(_objectSpread({}, getConfig(state).canvasNavigation || {}), {}, {
    tileFormat: window.tileFormat
  });
};
/**
 * Styles for withStyles HOC
 */


var styles = function styles(theme) {
  return {
    label: {
      paddingLeft: theme.spacing(1)
    }
  };
};

var enhance = compose(withStyles(styles), withTranslation(), connect(mapStateToProps, null), withPlugins('SidebarIndexThumbnail'));
export default enhance(SidebarIndexThumbnail);