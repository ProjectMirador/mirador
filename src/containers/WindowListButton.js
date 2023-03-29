import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withStyles from '@mui/styles/withStyles';
import { withPlugins } from '../extend/withPlugins';
import { getWindowIds, getWorkspace } from '../state/selectors';
import { WindowListButton } from '../components/WindowListButton';

/** */
const mapStateToProps = (state) => ({
  disabled: getWorkspace(state).isWorkspaceAddVisible,
  windowCount: getWindowIds(state).length,
});

/**
 *
 * @param theme
 * @returns {{background: {background: string}}}
 */
const styles = theme => ({
  badge: {
    paddingLeft: 12,
  },
  ctrlBtn: {
    margin: theme.spacing(1),
  },
  ctrlBtnSelected: {
    backgroundColor: theme.palette.action.selected,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, null),
  withPlugins('WindowListButton'),
);

export default enhance(WindowListButton);
