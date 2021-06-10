import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getWindowIds, getWorkspace } from '../state/selectors';
import { WorkspaceAddButton } from '../components/WorkspaceAddButton';
/**
 * mapStateToProps - to hook up connect
 * @memberof WorkspaceControlPanel
 * @private
 */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var width = _ref.width;

  var _getWorkspace = getWorkspace(state),
      isWorkspaceAddVisible = _getWorkspace.isWorkspaceAddVisible;

  return {
    isWorkspaceAddVisible: isWorkspaceAddVisible,
    useExtendedFab: width !== 'xs' && !isWorkspaceAddVisible && getWindowIds(state).length === 0
  };
};
/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */


var mapDispatchToProps = {
  setWorkspaceAddVisibility: actions.setWorkspaceAddVisibility
};
/**
 *
 * @param theme
 * @returns {{ctrlBtn: {margin: (number|string)}}}
 */

var styles = function styles(theme) {
  return {
    fab: {
      margin: theme.spacing(1)
    },
    fabPrimary: {
      '&:focus': {
        backgroundColor: theme.palette.primary.dark
      }
    },
    fabSecondary: {
      '&:focus': {
        backgroundColor: theme.palette.secondary.dark
      }
    }
  };
};

var enhance = compose(withTranslation(), withStyles(styles), withWidth(), connect(mapStateToProps, mapDispatchToProps), withPlugins('WorkspaceAddButton'));
export default enhance(WorkspaceAddButton);