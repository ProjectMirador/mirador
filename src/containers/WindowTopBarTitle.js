import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend/withPlugins';
import { getManifestTitle } from '../state/selectors';
import { WindowTopBarTitle } from '../components/WindowTopBarTitle';

/** mapStateToProps */
const mapStateToProps = (state, { windowId }) => ({
  hideWindowTitle: state.config.window.hideWindowTitle,
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
  connect(mapStateToProps, null),
  withPlugins('WindowTopBarTitle'),
);

export default enhance(WindowTopBarTitle);
