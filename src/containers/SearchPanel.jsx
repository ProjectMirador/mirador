import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../state/actions';
import { withPlugins } from '../extend/withPlugins';
import { SearchPanel } from '../components/SearchPanel';
import { getManifestSearchService, getSearchPointer, getWindow } from '../state/selectors';

/** */
function SearchPanelContainer({ id, windowId }) {
  const dispatch = useDispatch();

  const query = useSelector((state) => getSearchPointer(state, { companionWindowId: id, windowId }).query);
  const searchService = useSelector((state) => getManifestSearchService(state, { windowId }));
  const suggestedSearches = useSelector((state) => getWindow(state, { windowId }).suggestedSearches);

  return (
    <SearchPanel
      id={id}
      windowId={windowId}
      query={query}
      searchService={searchService}
      suggestedSearches={suggestedSearches}
      fetchSearch={(searchId, searchQuery) => dispatch(actions.fetchSearch(windowId, id, searchId, searchQuery))}
      removeSearch={() => dispatch(actions.removeSearch(windowId, id))}
    />
  );
}

SearchPanelContainer.propTypes = {
  id: PropTypes.string.isRequired,
  windowId: PropTypes.string.isRequired,
};

export default withPlugins('SearchPanel')(SearchPanelContainer);
