import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { SidebarIndexThumbnail } from '../components/SidebarIndexThumbnail';
import { getConfig } from '../state/selectors';

/**
 * mapStateToProps - used to hook up state to props
 * @memberof SidebarIndexThumbnail
 * @private
 */
const mapStateToProps = (state, { data }) => ({
  ...(getConfig(state).canvasNavigation || {}),
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, null),
  withPlugins('SidebarIndexThumbnail'),
);

export default enhance(SidebarIndexThumbnail);
