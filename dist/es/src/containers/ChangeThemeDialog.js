import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getThemeIds, getConfig } from '../state/selectors';
import { ChangeThemeDialog } from '../components/ChangeThemeDialog';
/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ChangeThemeDialog
 * @private
 */

var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref) {
  var windowId = _ref.windowId;
  return {
    setSelectedTheme: function setSelectedTheme(theme) {
      return dispatch(actions.updateConfig({
        selectedTheme: theme
      }));
    }
  };
};
/**
 * mapStateToProps - to hook up connect
 * @memberof ChangeThemeDialog
 * @private
 */


var mapStateToProps = function mapStateToProps(state) {
  return {
    selectedTheme: getConfig(state).selectedTheme,
    themeIds: getThemeIds(state)
  };
};
/** */


var styles = function styles(theme) {
  return {
    dark: {
      color: '#000000'
    },
    dialogContent: {
      padding: 0
    },
    light: {
      color: '#BDBDBD'
    },
    listitem: {
      '&:focus': {
        backgroundColor: theme.palette.action.focus
      },
      '&:hover': {
        backgroundColor: theme.palette.action.hover
      },
      cursor: 'pointer'
    }
  };
};

var enhance = compose(withTranslation(), withStyles(styles), connect(mapStateToProps, mapDispatchToProps), withPlugins('ChangeThemeDialog'));
export default enhance(ChangeThemeDialog);