import React, { Component } from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import debounce from 'lodash/debounce';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/SearchSharp';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

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

    if (query === '' && query !== prevProps.query) {
      // We are setting local state directly here ONLY when the query prop (from redux)
      // and it has been cleared out. This means a user has cleared the search and we
      // need to clear the controlled Input value as well.
      this.setState({ search: '' }); // eslint-disable-line react/no-did-update-set-state
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
    });

    this.fetchAutocomplete(value);
  }

  /** */
  fetchAutocomplete(value) {
    const { autocompleteService } = this.props;

    this.setState({
      suggestions: [],
    });

    if (!autocompleteService) return;

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
    fetchSearch(windowId, companionWindowId, `${searchService.id}?q=${search}`, search);
  }

  /** */
  selectItem(selectedItem) {
    this.setState({ search: selectedItem });
    this.submitSearch();
  }

  /** */
  render() {
    const { companionWindowId, selectOpen, t } = this.props;
    const { search } = this.state;
    const id = `search-${companionWindowId}`;
    return (
      <form onSubmit={this.submitSearch}>
        <FormControl>
          <Downshift
            id={id}
            inputValue={search}
            isOpen={selectOpen}
            onInputValueChange={this.handleChange}
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
              const { onBlur, onFocus, ...inputProps } = getInputProps({});
              return (
                <div>
                  {renderInput({
                    classes: {},
                    fullWidth: true,
                    InputLabelProps: getLabelProps(),
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={t('searchSubmitAria')}
                            type="submit"
                          >
                            <SearchIcon />
                          </IconButton>
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
                      <Paper square>
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
  searchService: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  selectOpen: PropTypes.bool,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

SearchPanelControls.defaultProps = {
  autocompleteService: undefined,
  query: '',
  selectOpen: undefined,
  t: key => key,
};
