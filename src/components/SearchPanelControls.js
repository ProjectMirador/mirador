import { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import deburr from 'lodash/deburr';
import debounce from 'lodash/debounce';
import isObject from 'lodash/isObject';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/SearchSharp';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import SearchPanelNavigation from '../containers/SearchPanelNavigation';

const StyledForm = styled('form')(({ theme }) => ({
  paddingBottom: theme.spacing(1),
  paddingRight: theme.spacing(1.5),
  width: '100%',
}));

const StyledEndAdornment = styled('div')(() => ({
  position: 'absolute',
  right: 0,
}));
/** Sometimes an autocomplete match can be a simple string, other times an object
    with a `match` property, this function abstracts that away */
const getMatch = (option) => (isObject(option) ? option.match : option);

/** */
export class SearchPanelControls extends Component {
  /** */
  constructor(props) {
    super(props);

    this.state = { search: props.query, suggestions: [] };
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.fetchAutocomplete = debounce(this.fetchAutocomplete.bind(this), 500);
    this.receiveAutocomplete = this.receiveAutocomplete.bind(this);
  }

  /**
   * Update the query in the component state if the query has changed in the redux store
   */
  componentDidUpdate(prevProps) {
    const { query } = this.props;
    if (query !== prevProps.query) {
      // We are setting local state directly here ONLY when the query prop (from redux)
      // changed
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        search: query,
      });
    }
  }

  /**
   * Cancel the debounce function when the component unmounts
   */
  componentWillUnmount() {
    this.fetchAutocomplete.cancel();
  }

  /** */
  handleChange(event, value, reason) {
    // For some reason the value gets reset to an empty value from the
    // useAutocomplete hook sometimes, we just ignore these cases
    if (reason === 'reset' && !value) {
      return;
    }
    this.setState({
      search: value,
      suggestions: [],
    });

    if (value) {
      this.fetchAutocomplete(value);
    }
  }

  /** */
  getSuggestions(value, { showEmpty = false } = {}) {
    const { suggestions } = this.state;

    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 && !showEmpty
      ? []
      : suggestions;
  }

  /** */
  fetchAutocomplete(value) {
    const { autocompleteService } = this.props;

    if (!autocompleteService) return;
    if (!value) return;

    fetch(`${autocompleteService.id}?${new URLSearchParams({ q: value })}`)
      .then(response => response.json())
      .then(this.receiveAutocomplete);
  }

  /** */
  receiveAutocomplete(json) {
    this.setState({ suggestions: json.terms });
  }

  /** */
  submitSearch(event) {
    const {
      companionWindowId, fetchSearch, searchService, windowId,
    } = this.props;
    const { search } = this.state;
    event && event.preventDefault();
    if (!search) return;
    fetchSearch(windowId, companionWindowId, `${searchService.id}?${new URLSearchParams({ q: search })}`, search);
  }

  /** */
  selectItem(_event, selectedItem, _reason) {
    if (selectedItem && getMatch(selectedItem)) {
      this.setState({ search: getMatch(selectedItem) }, this.submitSearch);
    }
  }

  /** */
  render() {
    const {
      companionWindowId, searchIsFetching, t, windowId,
    } = this.props;

    const { search, suggestions } = this.state;
    const id = `search-${companionWindowId}`;
    return (
      <>
        <StyledForm aria-label={t('searchTitle')} onSubmit={this.submitSearch}>
          <Autocomplete
            id={id}
            inputValue={search}
            options={suggestions}
            getOptionLabel={getMatch}
            isOptionEqualToValue={(option, value) => (
              deburr(getMatch(option).trim()).toLowerCase()
              === deburr(getMatch(value).trim()).toLowerCase()
            )}
            noOptionsText=""
            onChange={this.selectItem}
            onInputChange={this.handleChange}
            freeSolo
            renderInput={params => (
              <TextField
                {...params}
                label={t('searchInputLabel')}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <StyledEndAdornment>
                      <MiradorMenuButton aria-label={t('searchSubmitAria')} type="submit">
                        <SearchIcon />
                      </MiradorMenuButton>
                      {Boolean(searchIsFetching) && (
                      <CircularProgress
                        sx={{
                          position: 'absolute',
                          right: 0,
                        }}
                        size={50}
                      />
                      )}
                    </StyledEndAdornment>
                  ),
                }}
              />
            )}
          />
        </StyledForm>
        <SearchPanelNavigation windowId={windowId} companionWindowId={companionWindowId} />
      </>
    );
  }
}

SearchPanelControls.propTypes = {
  autocompleteService: PropTypes.shape({
    id: PropTypes.string,
  }),
  companionWindowId: PropTypes.string.isRequired,
  fetchSearch: PropTypes.func.isRequired,
  query: PropTypes.string,
  searchIsFetching: PropTypes.bool.isRequired,
  searchService: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

SearchPanelControls.defaultProps = {
  autocompleteService: undefined,
  query: '',
  t: key => key,
};
