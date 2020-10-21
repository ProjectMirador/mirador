import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withStyles from '@material-ui/core/styles/withStyles';
import { withPlugins } from '../extend/withPlugins';
import { SidebarSequenceItem } from '../components/SidebarSequenceItem';

/**
 * mapStateToProps - used to hook up state to props
 * @memberof SidebarSequenceItem
 * @private
 */

/**
 * Styles for withStyles HOC
 */
const styles = (theme) => ({
  label: {
    paddingLeft: theme.spacing(1),
  },
});

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  connect(null, null),
  withPlugins('SidebarSequenceItem'),
);

export default enhance(SidebarSequenceItem);
