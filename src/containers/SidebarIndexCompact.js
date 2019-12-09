import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { SidebarIndexCompact } from '../components/SidebarIndexCompact';

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
  withPlugins('SidebarIndexCompact'),
);

export default enhance(SidebarIndexCompact);
