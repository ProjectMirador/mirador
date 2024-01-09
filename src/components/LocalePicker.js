import { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

/**
 * Provide a locale picker
 */
export class LocalePicker extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      availableLocales,
      locale,
      setLocale,
    } = this.props;

    if (!setLocale || availableLocales.length < 2) return null;
    const selectedLocale = availableLocales.indexOf(locale) >= 0 ? locale : availableLocales[0];

    return (
      <FormControl>
        <Select
          MenuProps={{
            anchorOrigin: {
              horizontal: 'left',
              vertical: 'bottom',
            },
          }}
          displayEmpty
          value={selectedLocale}
          onChange={(e) => { setLocale(e.target.value); }}
          name="locale"
        >
          {
            availableLocales.map(l => (
              <MenuItem key={l} value={l}><Typography variant="body2">{ l }</Typography></MenuItem>
            ))
          }
        </Select>
      </FormControl>
    );
  }
}

LocalePicker.propTypes = {
  availableLocales: PropTypes.arrayOf(PropTypes.string),
  locale: PropTypes.string,
  setLocale: PropTypes.func,
};

LocalePicker.defaultProps = {
  availableLocales: [],
  locale: '',
  setLocale: undefined,
};
