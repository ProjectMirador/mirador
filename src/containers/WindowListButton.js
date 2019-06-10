import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { WindowListButton } from '../components/WindowListButton';

/** */
const mapStateToProps = ({ windows, workspace }) => ({
  disabled: workspace.isWorkspaceAddVisible,
  windowCount: Object.keys(windows).length,
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
