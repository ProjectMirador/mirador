import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { MinimalWindow } from '../components/MinimalWindow';
import { getWindowConfig } from '../state/selectors';
import { withWindowContext } from '../contexts/WindowContext';

/** mapStateToProps */
const mapStateToProps = (state, { windowId }) => ({
  allowClose: getWindowConfig(state, { windowId }).allowClose,
  allowWindowSideBar: getWindowConfig(state, { windowId }).allowWindowSideBar,
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  removeWindow: () => dispatch(actions.removeWindow(windowId)),
});

/**
 * @param theme
 * @returns {{typographyBody: {flexGrow: number, fontSize: number|string},
 * windowTopBarStyle: {minHeight: number, paddingLeft: number, backgroundColor: string}}}
 */
const styles = theme => ({
  button: {
    marginLeft: 'auto',
  },
  title: {
    ...theme.typography.h6,
    flexGrow: 1,
    paddingLeft: theme.spacing(0.5),
  },
  window: {
    backgroundColor: theme.palette.shades?.dark,
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 0,
    overflow: 'hidden',
    width: '100%',
  },
  windowTopBarStyle: {
    backgroundColor: theme.palette.shades?.main,
    borderTop: '2px solid transparent',
    minHeight: 32,
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  withWindowContext,
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('MinimalWindow'),
);

export default enhance(MinimalWindow);
