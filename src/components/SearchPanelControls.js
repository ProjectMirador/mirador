import React, { Component } from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import debounce from 'lodash/debounce';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/SearchSharp';
import InputAdornment from '@material-ui/core/InputAdornment';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import SearchPanelNavigation from '../containers/SearchPanelNavigation';

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
   * Set the component's local search state
   * to blank when the query has been cleared
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
  handleChange(event, value, reason) {
    this.setState({
      search: value,
      suggestions: [],
    });

    this.fetchAutocomplete(value);
  }

  /** */
  fetchAutocomplete(value) {
    const { autocompleteService } = this.props;

    if (!autocompleteService) return;
    if (!value) return;

    fetch(`${autocompleteService.id}?q=${value}`)
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
    fetchSearch(windowId, companionWindowId, `${searchService.id}?q=${search}`, search);
  }

  /** */
  selectItem(selectedItem) {
    this.setState({ search: selectedItem });
    this.submitSearch();
  }

  /** */
  render() {
    const {
      classes, companionWindowId, searchIsFetching, t, windowId,
    } = this.props;

    const { search, suggestions } = this.state;
    const id = `search-${companionWindowId}`;
    return (
      <>
        <form onSubmit={this.submitSearch} style={{ width: '100%' }}>
          <FormControl className={classes.searchInput}>
            <Autocomplete
              id={id}
              inputValue={search}
              options={suggestions}
              getOptionLabel={option => option.match}
              getOptionSelected={(option, value) => (
                deburr(option.match.trim()).toLowerCase()
                  === deburr(value.match.trim()).toLowerCase()
              )}
              onInputChange={this.handleChange}
              fullWidth
              renderInput={params => (
                <TextField
                  {...params}
                  fullWidth
                  label={t('searchInputLabel')}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <InputAdornment position="end" className={classes.adornmentWrapper}>
                        <MiradorMenuButton aria-label={t('searchSubmitAria')} type="submit">
                          <SearchIcon />
                        </MiradorMenuButton>
                        {Boolean(searchIsFetching) && (
                          <CircularProgress className={classes.searchProgress} size={50} />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </FormControl>
        </form>
        <SearchPanelNavigation windowId={windowId} companionWindowId={companionWindowId} />
      </>
    );
  }
}

SearchPanelControls.propTypes = {
  autocompleteService: PropTypes.shape({
    id: PropTypes.string,
  }),
  classes: PropTypes.objectOf(PropTypes.string),
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
  classes: {},
  query: '',
  t: key => key,
};
