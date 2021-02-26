function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withSize } from 'react-sizeme';
import { withPlugins } from '../extend/withPlugins';
import { withRef } from '../extend/withRef';
import * as actions from '../state/actions';
import { getCompanionWindow, getThemeDirection, getWindowConfig } from '../state/selectors';
import { CompanionWindow } from '../components/CompanionWindow';
/**
 * mapStateToProps - to hook up connect
 * @memberof CompanionWindow
 * @private
 */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id,
      windowId = _ref.windowId;
  var companionWindow = getCompanionWindow(state, {
    companionWindowId: id
  });

  var _getWindowConfig = getWindowConfig(state, {
    windowId: windowId
  }),
      defaultSidebarPanelHeight = _getWindowConfig.defaultSidebarPanelHeight,
      defaultSidebarPanelWidth = _getWindowConfig.defaultSidebarPanelWidth;

  return _objectSpread(_objectSpread({}, companionWindow), {}, {
    defaultSidebarPanelHeight: defaultSidebarPanelHeight,
    defaultSidebarPanelWidth: defaultSidebarPanelWidth,
    direction: getThemeDirection(state),
    isDisplayed: companionWindow && companionWindow.content && companionWindow.content.length > 0
  });
};
/**
 * mapDispatchToProps - to hook up connect
 * @memberof CompanionWindow
 * @private
 */


var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var windowId = _ref2.windowId,
      id = _ref2.id;
  return {
    onCloseClick: function onCloseClick() {
      return dispatch(actions.removeCompanionWindow(windowId, id));
    },
    updateCompanionWindow: function updateCompanionWindow() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return dispatch(actions.updateCompanionWindow.apply(actions, [windowId, id].concat(args)));
    }
  };
};
/**
 *
 * @param theme
 * @returns {{closeButton: {top: number, position: string, right: number},
 * root: {overflowY: string, width: string}}}
 */


var styles = function styles(theme) {
  return {
    closeButton: {
      order: 4
    },
    'companionWindow-bottom': {
      borderTop: "0.5px solid ".concat(theme.palette.divider)
    },
    'companionWindow-left': {
      borderRight: "0.5px solid ".concat(theme.palette.divider)
    },
    'companionWindow-right': {
      borderLeft: "0.5px solid ".concat(theme.palette.divider)
    },
    companionWindowHeader: {
      flexWrap: 'wrap'
    },
    companionWindowTitleControls: {
      flexGrow: 1,
      order: 1000
    },
    companionWindowTitleControlsBottom: {
      order: 'unset'
    },
    content: {
      overflowY: 'auto',
      wordBreak: 'break-word'
    },
    horizontal: {},
    positionButton: {
      marginLeft: -16,
      order: -100,
      width: 24
    },
    rnd: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0
    },
    root: {
      boxShadow: 'none',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0
    },
    small: {},
    titleControls: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'row wrap',
      minHeight: 48,
      order: 3
    },
    toolbar: {
      '&$small': {
        '& $closeButton': {
          order: 'unset'
        },
        '& $titleControls': {
          order: 'unset'
        }
      },
      alignItems: 'flex-start',
      background: theme.palette.shades.light,
      justifyContent: 'space-between',
      minHeight: 'max-content',
      paddingLeft: theme.spacing(2)
    },
    vertical: {},
    windowSideBarTitle: _objectSpread(_objectSpread({}, theme.typography.subtitle1), {}, {
      alignSelf: 'center',
      flexGrow: 1,
      width: 160
    })
  };
};

var enhance = compose(withRef(), withTranslation(), withStyles(styles), withSize(), connect(mapStateToProps, mapDispatchToProps), withPlugins('CompanionWindow'));
export default enhance(CompanionWindow);