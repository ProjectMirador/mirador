import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { SidebarIndexThumbnail } from '../components/SidebarIndexThumbnail';

/**
 * mapStateToProps - used to hook up state to props
 * @memberof SidebarIndexThumbnail
 * @private
 */
const mapStateToProps = (state, { data }) => ({
  config: state.config,
});

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
  connect(mapStateToProps, null),
  withPlugins('SidebarIndexThumbnail'),
);

export default enhance(SidebarIndexThumbnail);
