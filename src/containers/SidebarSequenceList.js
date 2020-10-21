import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withStyles from '@material-ui/core/styles/withStyles';
import { withPlugins } from '../extend/withPlugins';
import { SidebarSequenceList } from '../components/SidebarSequenceList';

/**
 * mapStateToProps - used to hook up state to props
 * @memberof SidebarSequenceList
 * @private
 */

/**
 * Styles for withStyles HOC
 */
const styles = (theme) => ({
  label: {
    paddingLeft: theme.spacing(1),
  },
  listItem: {
    borderBottom: `0.5px solid ${theme.palette.divider}`,
    paddingRight: theme.spacing(1),
    width: '100%',
  },
});

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  connect(null, null),
  withPlugins('SidebarSequenceList'),
);

export default enhance(SidebarSequenceList);
