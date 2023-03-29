import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import withStyles from '@mui/styles/withStyles';
import { withPlugins } from '../extend/withPlugins';
import { WorkspaceOptionsButton } from '../components/WorkspaceOptionsButton';

/**
 *
 * @param theme
 */
const styles = theme => ({
  ctrlBtn: {
    margin: theme.spacing(1),
  },
  ctrlBtnSelected: {
    backgroundColor: theme.palette.action.selected,
  },
});

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  withPlugins('WorkspaceOptionsButton'),
);

export default enhance(WorkspaceOptionsButton);
