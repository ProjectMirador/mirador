import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend';
import * as actions from '../state/actions';
import { ChangeThemeDialog } from '../components/ChangeThemeDialog';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ChangeThemeDialog
 * @private
 */
const mapDispatchToProps = {
  updateConfig: actions.updateConfig,
};

/** */
const styles = theme => ({
  darkColor: {
    color: theme.palette.grey['900'],
  },
  lightColor: {
    color: theme.palette.grey['500'],
  },
});


const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(undefined, mapDispatchToProps),
  withPlugins('ChangeThemeDialog'),
);

export default enhance(ChangeThemeDialog);
