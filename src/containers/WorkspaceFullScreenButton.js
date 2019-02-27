import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import * as actions from '../state/actions';
import { WorkspaceFullScreenButton }
  from '../components/WorkspaceFullScreenButton';

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
  connect(null, mapDispatchToProps),
  miradorWithPlugins,
);

export default enhance(WorkspaceFullScreenButton);
