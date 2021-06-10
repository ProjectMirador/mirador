import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend/withPlugins';
import { WindowTopBarPluginMenu } from '../components/WindowTopBarPluginMenu';
import { getContainerId } from '../state/selectors';
/**
 * mapStateToProps - to hook up connect
 * @memberof WindowTopBarPluginMenu
 * @private
 */

var mapStateToProps = function mapStateToProps(state) {
  return {
    containerId: getContainerId(state)
  };
};
/**
 *
 * @param theme
 * @returns {{ctrlBtn: {margin: (number|string)}}}
 */


var styles = function styles(theme) {
  return {
    ctrlBtnSelected: {
      backgroundColor: theme.palette.action.selected
    }
  };
};

var enhance = compose(withTranslation(), withStyles(styles), connect(mapStateToProps, null), withPlugins('WindowTopBarPluginMenu'));
export default enhance(WindowTopBarPluginMenu);