import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import * as actions from '../state/actions';
import WorkspaceElasticWindow from '../components/WorkspaceElasticWindow';
import { selectCompanionWindowDimensions, getWorkspace, isFocused, getElasticLayout } from '../state/selectors';
/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    companionWindowDimensions: selectCompanionWindowDimensions(state, {
      windowId: windowId
    }),
    focused: isFocused(state, {
      windowId: windowId
    }),
    layout: getElasticLayout(state)[windowId],
    workspace: getWorkspace(state)
  };
};
/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */


var mapDispatchToProps = function mapDispatchToProps(dispatch, props) {
  return {
    updateElasticWindowLayout: function updateElasticWindowLayout(windowId, position) {
      dispatch(actions.updateElasticWindowLayout(windowId, position));
    }
  };
};
/**
 * @param theme
 */


var styles = function styles(theme) {
  return {
    focused: {
      zIndex: theme.zIndex.modal - 1
    }
  };
};

var enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps) // further HOC go here
);
export default enhance(WorkspaceElasticWindow);