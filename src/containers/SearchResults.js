import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import { SearchResults } from '../components/SearchResults';
import * as actions from '../state/actions';
import {
  getCanvases,
  getSearchQuery,
} from '../state/selectors';

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SearchResult
 * @private
 */
const mapStateToProps = (state, { companionWindowId, windowId }) => ({
  canvases: getCanvases(state, { windowId }),
  query: getSearchQuery(state, { companionWindowId, windowId }),
});

const mapDispatchToProps = {
  fetchSearch: actions.fetchSearch,
};

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), withPlugins('SearchResults'));

export default enhance(SearchResults);
