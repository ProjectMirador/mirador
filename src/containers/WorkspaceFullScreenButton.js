import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend';
import * as actions from '../state/actions';
import { getFullScreenEnabled } from '../state/selectors';
import { WorkspaceFullScreenButton }
  from '../components/WorkspaceFullScreenButton';

/**
 * mapStateToProps - to hook up connect
 * @memberof WorkspaceFullScreenButton
 * @private
 */
const mapStateToProps = state => ({
  isFullscreenEnabled: getFullScreenEnabled(state),
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = { setWorkspaceFullscreen: actions.setWorkspaceFullscreen };

/**
 *
 * @param theme
 * @returns {{ctrlBtn: {margin: (number|string)}}}
 */
const styles = theme => ({
  ctrlBtn: {
    margin: theme.spacing.unit,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WorkspaceFullScreenButton'),
);

export default enhance(WorkspaceFullScreenButton);
