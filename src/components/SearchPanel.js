import { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import CompanionWindow from '../containers/CompanionWindow';
import SearchPanelControls from '../containers/SearchPanelControls';
import SearchResults from '../containers/SearchResults';

/** */
export class SearchPanel extends Component {
  /** */
  constructor(props) {
    super(props);

    this.containerRef = createRef();
  }

  /** */
  render() {
    const {
      fetchSearch,
      windowId,
      id,
      query,
      removeSearch,
      searchService,
      suggestedSearches,
      t,
    } = this.props;

    return (
      <CompanionWindow
        ariaLabel={t('searchTitle')}
        title={(
          <>
            {t('searchTitle')}
            {
              query && query !== '' && (
                <Chip
                  role="button"
                  sx={{ marginLeft: 1 }}
                  color="secondary"
                  label={t('clearSearch')}
                  onClick={removeSearch}
                  onDelete={removeSearch}
                  size="small"
                  tabIndex={0}
                  variant="outlined"
                />
              )
            }
          </>
        )}
        windowId={windowId}
        id={id}
        titleControls={<SearchPanelControls companionWindowId={id} windowId={windowId} />}
        ref={this.containerRef}
      >
        <SearchResults
          containerRef={this.containerRef}
          companionWindowId={id}
          windowId={windowId}
        />
        {
          fetchSearch && suggestedSearches && query === '' && suggestedSearches.map(search => (
            <Typography component="p" key={search} variant="body1" sx={{ margin: 2 }}>
              <Button
                variant="inlineText"
                color="secondary"
                onClick={() => fetchSearch(`${searchService.id}?q=${search}`, search)}
              >
                {t('suggestSearch', { query: search })}
              </Button>
            </Typography>
          ))
        }
      </CompanionWindow>
    );
  }
}

SearchPanel.propTypes = {
  fetchSearch: PropTypes.func,
  id: PropTypes.string.isRequired,
  query: PropTypes.string,
  removeSearch: PropTypes.func.isRequired,
  searchService: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  suggestedSearches: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

SearchPanel.defaultProps = {
  fetchSearch: undefined,
  query: '',
  suggestedSearches: [],
  t: key => key,
};
