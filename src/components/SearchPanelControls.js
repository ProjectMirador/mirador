import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/SearchSharp';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

/** */
export class SearchPanelControls extends Component {
  /** */
  constructor(props) {
    super(props);

    this.state = { search: props.query };
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
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
  handleChange(event) {
    this.setState({
      search: event.target.value,
    });
  }

  /** */
  submitSearch(event) {
    const {
      companionWindowId, fetchSearch, searchService, windowId,
    } = this.props;
    const { search } = this.state;
    event.preventDefault();
    fetchSearch(windowId, companionWindowId, `${searchService.id}?q=${search}`, search);
  }

  /** */
  render() {
    const { companionWindowId, t } = this.props;
    const { search } = this.state;
    const id = `search-${companionWindowId}`;
    return (
      <form onSubmit={this.submitSearch}>
        <FormControl>
          <InputLabel htmlFor={id}>{t('searchInputLabel')}</InputLabel>
          <Input
            id={id}
            onChange={this.handleChange}
            value={search}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  aria-label={t('searchSubmitAria')}
                  type="submit"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )}
          />
        </FormControl>
      </form>
    );
  }
}

SearchPanelControls.propTypes = {
  companionWindowId: PropTypes.string.isRequired,
  fetchSearch: PropTypes.func.isRequired,
  query: PropTypes.string,
  searchService: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

SearchPanelControls.defaultProps = {
  query: '',
  t: key => key,
};
