import React, { Component } from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import debounce from 'lodash/debounce';
import Downshift from 'downshift';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/SearchSharp';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import SearchPanelNavigation from '../containers/SearchPanelNavigation';

/** */
function renderInput(inputProps) {
  const {
    InputProps,
    classes,
    ref,
    ...other
  } = inputProps;

  return (
    <TextField
      InputProps={{
        classes: {
          input: classes.inputInput,
          root: classes.inputRoot,
        },
        inputRef: ref,
        ...InputProps,
      }}
      {...other}
    />
  );
}

/** */
function renderSuggestion(suggestionProps) {
  const {
    suggestion, index, itemProps, highlightedIndex, selectedItem,
  } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.match) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.match}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.match}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  itemProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  selectedItem: PropTypes.string.isRequired,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

/** */
export class SearchPanelControls extends Component {
  /** */
  constructor(props) {
    super(props);

    this.state = { search: props.query, selectOpen: props.selectOpen, suggestions: [] };
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
  handleChange(value) {
    this.setState({
      search: value,
      selectOpen: true,
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
    this.setState({ selectOpen: false });
    fetchSearch(windowId, companionWindowId, `${searchService.id}?q=${search}`, search);
  }

  /** */
  selectItem(selectedItem) {
    this.setState({ search: selectedItem, selectOpen: false });
    this.submitSearch();
  }

  /** */
  render() {
    const {
      classes, companionWindowId, searchIsFetching, t, windowId,
    } = this.props;

    const { search, selectOpen } = this.state;
    const id = `search-${companionWindowId}`;
    return (
      <>
        <form onSubmit={this.submitSearch}>
          <FormControl className={classes.searchInput}>
            <Downshift
              id={id}
              inputValue={search}
              isOpen={selectOpen}
              onOuterClick={() => this.setState({ selectOpen: false })}
              onSelect={this.selectItem}
            >
              {({
                getInputProps,
                getItemProps,
                getLabelProps,
                getMenuProps,
                highlightedIndex,
                inputValue,
                isOpen,
                selectedItem,
              }) => {
                const { onBlur, onFocus, ...inputProps } = getInputProps({
                  onChange: (e) => {
                    this.handleChange(e.target.value);
                  },
                  onKeyDown: (e) => {
                    e.nativeEvent.preventDownshiftDefault = true;
                  },
                });
                return (
                  <div>
                    {renderInput({
                      classes: {},
                      fullWidth: true,
                      InputLabelProps: getLabelProps(),
                      InputProps: {
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
                        id,
                        onBlur,
                        onFocus,
                      },
                      inputProps,
                      label: t('searchInputLabel'),
                    })}
                    <div {...getMenuProps()}>
                      {isOpen ? (
                        <Paper square className={classes.suggestions}>
                          {
                            this.getSuggestions(inputValue).map((suggestion, index) => (
                              renderSuggestion({
                                highlightedIndex,
                                index,
                                itemProps: getItemProps({ item: suggestion.match }),
                                selectedItem,
                                suggestion,
                              })
                            ))
                          }
                        </Paper>
                      ) : null}
                    </div>
                  </div>
                );
              }}
            </Downshift>
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
  selectOpen: PropTypes.bool,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

SearchPanelControls.defaultProps = {
  autocompleteService: undefined,
  classes: {},
  query: '',
  selectOpen: undefined,
  t: key => key,
};
