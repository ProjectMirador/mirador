import { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import CompanionWindow from '../../containers/CompanionWindow';
import { withPlugins } from '../../extend/withPlugins';
import * as actions from '../../state/actions';
import { getManifestSearchService, getSearchQuery, getWindow } from '../../state/selectors';
import SearchPanelControls from './SearchPanelControls';
import SearchResults from './SearchResults';

/**
 * SearchPanel ~
 */
export function SearchPanel({ id, windowId }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  const query = useSelector((state) => getSearchQuery(state, { companionWindowId: id, windowId })) || '';
  const searchService = useSelector((state) => getManifestSearchService(state, { windowId }));
  const suggestedSearches = useSelector((state) => getWindow(state, { windowId })?.suggestedSearches) || [];

  const handleFetchSearch = useCallback(
    (searchId, searchQuery) => dispatch(actions.fetchSearch(windowId, id, searchId, searchQuery)),
    [dispatch, id, windowId],
  );

  const handleRemoveSearch = useCallback(() => dispatch(actions.removeSearch(windowId, id)), [dispatch, id, windowId]);

  return (
    <CompanionWindow
      ariaLabel={t('searchTitle')}
      title={
        <>
          {t('searchTitle')}
          {query !== '' && (
            <Chip
              aria-label={t('clearSearchAria')}
              role="button"
              sx={{ marginLeft: 1 }}
              color="secondary"
              label={t('clearSearch')}
              onClick={handleRemoveSearch}
              onDelete={handleRemoveSearch}
              size="small"
              tabIndex={0}
              variant="outlined"
            />
          )}
        </>
      }
      windowId={windowId}
      id={id}
      titleControls={<SearchPanelControls companionWindowId={id} windowId={windowId} />}
      ref={containerRef}
    >
      <SearchResults containerRef={containerRef} companionWindowId={id} windowId={windowId} />
      {suggestedSearches.length > 0 &&
        query === '' &&
        suggestedSearches.map((search) => (
          <Typography component="p" key={search} variant="body1" sx={{ margin: 2 }}>
            <Button
              variant="inlineText"
              color="secondary"
              onClick={() => handleFetchSearch(`${searchService.id}?${new URLSearchParams({ q: search })}`, search)}
            >
              {t('suggestSearch', { query: search })}
            </Button>
          </Typography>
        ))}
    </CompanionWindow>
  );
}

SearchPanel.propTypes = {
  id: PropTypes.string.isRequired,
  windowId: PropTypes.string.isRequired,
};

export default withPlugins('SearchPanel')(SearchPanel);
