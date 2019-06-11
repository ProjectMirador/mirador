import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { SearchPanelControls } from '../components/SearchPanelControls';
import * as actions from '../state/actions';
import {
  getManifestSearchService,
} from '../state/selectors';

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SearchPanelControls
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  searchService: getManifestSearchService(state, { windowId }),
});

/**
 * mapDispatchToProps - to hook up connect
 * @memberof SearchPanelControls
 * @private
 */
const mapDispatchToProps = {
  fetchSearch: actions.fetchSearch,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles({}),
  withTranslation(),
  withPlugins('SearchPanelControls'),
);

export default enhance(SearchPanelControls);
