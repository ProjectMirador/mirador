import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { SidebarIndexItem } from '../components/SidebarIndexItem';

const enhance = compose(
  withTranslation(),
  connect(null, null),
  withPlugins('SidebarIndexItem'),
);

export default enhance(SidebarIndexItem);
