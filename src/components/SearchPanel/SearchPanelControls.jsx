import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withPlugins } from '../../extend/withPlugins';
import * as actions from '../../state/actions';
import {
  getManifestAutocompleteService,
  getManifestSearchService,
  getSearchIsFetching,
  getSearchQuery,
} from '../../state/selectors';
import SearchInputForm from './SearchInputForm';
import SearchPanelNavigation from './SearchPanelNavigation';
import { useSearchAutocomplete } from './useSearchAutocomplete';

/** */
export function SearchPanelControls({ companionWindowId, windowId }) {
  const dispatch = useDispatch();

  const autocompleteService = useSelector((state) => getManifestAutocompleteService(state, { windowId }));
  const query = useSelector((state) => getSearchQuery(state, { companionWindowId, windowId })) || '';
  const searchIsFetching = useSelector((state) => getSearchIsFetching(state, { companionWindowId, windowId }));
  const searchService = useSelector((state) => getManifestSearchService(state, { windowId }));

  const { suggestions, fetchSuggestions, clearSuggestions } = useSearchAutocomplete(autocompleteService);

  const fetchSearch = useCallback((...args) => dispatch(actions.fetchSearch(...args)), [dispatch]);

  const [input, setInput] = useState(query);
  const [search, setSearch] = useState(query);

  useEffect(() => {
    setInput(query);
    setSearch(query);
    clearSuggestions();
  }, [query, clearSuggestions]);

  useEffect(() => {
    if (search && search !== '' && searchService) {
      fetchSearch(windowId, companionWindowId, `${searchService.id}?${new URLSearchParams({ q: search })}`, search);
    }
  }, [search, searchService, companionWindowId, fetchSearch, windowId]);

  const handleChange = (_event, value, reason) => {
    if (reason === 'reset' && !value) return;
    setInput(value);
    clearSuggestions();

    if (value) {
      fetchSuggestions(value);
    }
  };

  const submitSearch = (event) => {
    if (!input) return;
    if (event) event.preventDefault();
    setSearch(input);
  };

  return (
    <>
      <SearchInputForm
        id={`search-${companionWindowId}`}
        inputValue={input}
        isFetching={searchIsFetching}
        onInputChange={handleChange}
        onSelectItem={setSearch}
        onSubmit={submitSearch}
        suggestions={suggestions}
      />
      <SearchPanelNavigation windowId={windowId} companionWindowId={companionWindowId} />
    </>
  );
}

SearchPanelControls.propTypes = {
  companionWindowId: PropTypes.string.isRequired,
  windowId: PropTypes.string.isRequired,
};

export default withPlugins('SearchPanelControls')(SearchPanelControls);
