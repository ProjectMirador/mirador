import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import * as actions from '../state/actions';
import { WorkspaceFullScreenButton }
  from '../components/WorkspaceFullScreenButton';

/**
 * mapStateToProps - to hook up connect
 * @memberof WorkspaceFullScreenButton
 * @private
 */
const mapStateToProps = state => ({
  isFullscreenEnabled: state.workspace.isFullscreenEnabled,
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = { setWorkspaceFullscreen: actions.setWorkspaceFullscreen };

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(WorkspaceFullScreenButton);
