import PropTypes from 'prop-types';
import { useGetSearchResponseQuery } from '../state/api/iiifApi';

/**
 * Holds an RTK Query subscription for one search-results page. Renders
 * nothing -- SearchResults reads the cached page data itself via
 * getSearchResponsesForPointer. A search page has no natural
 * per-page render unit: results from every page get merged into one
 * sorted list, so fetching and rendering happen at different levels here.
 *
 * One of these is mounted per searchId currently in the companion
 * window's pointer (see containers/SearchResults.jsx), which is what
 * makes both pagination and window/companion-window close correct for
 * free: a page's subscription survives for exactly as long as its
 * searchId stays in the pointer (so paging past it never evicts it), and
 * disappears the moment the pointer drops it (a new query, REMOVE_SEARCH,
 * or the window/companion window closing), letting RTK Query's normal
 * keepUnusedDataFor timer garbage-collect it
 */
function SearchResponseSubscription({ searchId }) {
  useGetSearchResponseQuery(searchId);
  return null;
}

SearchResponseSubscription.propTypes = {
  searchId: PropTypes.string.isRequired,
};

export default SearchResponseSubscription;
