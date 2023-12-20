import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend/withPlugins';
import { getManifestStatus, getManifestTitle, getWindowConfig } from '../state/selectors';
import { WindowTopBarTitle } from '../components/WindowTopBarTitle';
import { withWindowContext } from '../contexts/WindowContext';

/** mapStateToProps */
const mapStateToProps = (state, { windowId }) => ({
  error: getManifestStatus(state, { windowId }).error,
  hideWindowTitle: getWindowConfig(state, { windowId }).hideWindowTitle,
  isFetching: getManifestStatus(state, { windowId }).isFetching,
  manifestTitle: getManifestTitle(state, { windowId }),
});

/**
 * @param theme
 */
const styles = theme => ({
  title: {
    ...theme.typography.h6,
    flexGrow: 1,
    paddingLeft: theme.spacing(0.5),
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  withWindowContext,
  connect(mapStateToProps, null),
  withPlugins('WindowTopBarTitle'),
);

export default enhance(WindowTopBarTitle);
