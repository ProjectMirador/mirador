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

    this.state = { search: '' };
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
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
    fetchSearch(windowId, companionWindowId, `${searchService.id}?q=${search}`);
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
  searchService: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

SearchPanelControls.defaultProps = {
  t: key => key,
};
