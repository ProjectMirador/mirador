import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { ChangeThemeDialog } from '../components/ChangeThemeDialog';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ChangeThemeDialog
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  setSelectedTheme: theme => dispatch(actions.updateConfig({ selectedTheme: theme })),
});

/**
 * mapStateToProps - to hook up connect
 * @memberof ChangeThemeDialog
 * @private
 */
const mapStateToProps = state => ({
  theme: state.config.selectedTheme,
});

/** */
const styles = theme => ({
  darkColor: {
    color: '#000000',
  },
  dialogContent: {
    padding: 0,
  },
  lightColor: {
    color: '#BDBDBD',
  },
  listitem: {
    '&:focus': {
      backgroundColor: theme.palette.action.focus,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    cursor: 'pointer',
  },
});


const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('ChangeThemeDialog'),
);

export default enhance(ChangeThemeDialog);
