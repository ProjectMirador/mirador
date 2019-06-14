import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { SearchPanelControls } from '../components/SearchPanelControls';
import * as actions from '../state/actions';
import {
  getManifestAutocompleteService,
  getManifestSearchService,
  getSearchResultsForCompanionWindow,
} from '../state/selectors';

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SearchPanelControls
 * @private
 */
const mapStateToProps = (state, { companionWindowId, windowId }) => {
  const results = getSearchResultsForCompanionWindow(state, { companionWindowId, windowId });
  return {
    autocompleteService: getManifestAutocompleteService(state, { windowId }),
    query: results && results.query,
    searchService: getManifestSearchService(state, { windowId }),
  };
};

/**
 * mapDispatchToProps - to hook up connect
 * @memberof SearchPanelControls
 * @private
 */
const mapDispatchToProps = {
  fetchSearch: actions.fetchSearch,
};

/** */
const styles = theme => ({
  suggestions: {
    position: 'absolute',
    zIndex: theme.zIndex.modal - 1,
  },
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withTranslation(),
  withPlugins('SearchPanelControls'),
);

export default enhance(SearchPanelControls);
