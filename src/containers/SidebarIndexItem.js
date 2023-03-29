import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withStyles from '@mui/styles/withStyles';
import { withPlugins } from '../extend/withPlugins';
import { SidebarIndexItem } from '../components/SidebarIndexItem';

/**
 * Styles for withStyles HOC
 */
const styles = theme => ({
  label: {
    paddingLeft: theme.spacing(1),
  },
});

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  connect(null, null),
  withPlugins('SidebarIndexItem'),
);

export default enhance(SidebarIndexItem);
