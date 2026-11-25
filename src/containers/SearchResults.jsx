import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import { SearchResults } from '../components/SearchResults';
import SearchResponseSubscription from './SearchResponseSubscription';
import * as actions from '../state/actions';
import {
  getCanvases,
  getSearchPointer,
  getSearchResponsesForPointer,
  deriveSearchIsFetching,
  deriveSearchNumTotal,
  deriveNextSearchId,
  deriveSortedSearchHits,
  deriveSortedSearchAnnotations,
} from '../state/selectors';

/** */
function SearchResultsContainer({ companionWindowId, containerRef = undefined, windowId }) {
  const dispatch = useDispatch();
  const pointer = useSelector((state) => getSearchPointer(state, { companionWindowId, windowId }));
  const pages = useSelector((state) => getSearchResponsesForPointer(state, { companionWindowId, windowId }));
  const canvases = useSelector((state) => getCanvases(state, { windowId }));

  return (
    <>
      {(pointer.searchIds || []).map((searchId) => (
        <SearchResponseSubscription key={searchId} searchId={searchId} />
      ))}
      <SearchResults
        companionWindowId={companionWindowId}
        containerRef={containerRef}
        windowId={windowId}
        query={pointer.query}
        isFetching={deriveSearchIsFetching(pages)}
        nextSearch={deriveNextSearchId(pointer, pages)}
        searchNumTotal={deriveSearchNumTotal(pages)}
        searchHits={deriveSortedSearchHits(pages, canvases)}
        searchAnnotations={deriveSortedSearchAnnotations(pages, canvases)}
        fetchSearch={(...args) => dispatch(actions.fetchSearch(...args))}
      />
    </>
  );
}

SearchResultsContainer.propTypes = {
  companionWindowId: PropTypes.string.isRequired,
  containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })]),
  windowId: PropTypes.string.isRequired,
};

export default withPlugins('SearchResults')(SearchResultsContainer);
