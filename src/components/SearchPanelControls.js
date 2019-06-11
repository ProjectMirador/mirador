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
  render() {
    const { cwId, t } = this.props;
    const id = `search-${cwId}`;
    return (
      <div>
        <FormControl>
          <InputLabel htmlFor={id}>{t('searchInputLabel')}</InputLabel>
          <Input
            id={id}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton aria-label={t('searchSubmitAria')}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )}
          />
        </FormControl>
      </div>
    );
  }
}

SearchPanelControls.propTypes = {
  cwId: PropTypes.string.isRequired,
  t: PropTypes.func,
};

SearchPanelControls.defaultProps = {
  t: key => key,
};
