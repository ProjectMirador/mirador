import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

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
      classes,
      setLocale,
      userLanguages,
    } = this.props;
    let { locale } = this.props;

    if (!setLocale || availableLocales.length < 2) return <></>;
    // If `locale` is not among the available locales, it should be the first available
    // locale that matches the language preferences from the `userLanguages` store value
    if (availableLocales.indexOf(locale) < 0) {
      locale = userLanguages.find(l => availableLocales.indexOf(l) >= 0) ?? availableLocales[0];
    }
    return (
      <FormControl>
        <Select
          MenuProps={{
            anchorOrigin: {
              horizontal: 'left',
              vertical: 'bottom',
            },
            getContentAnchorEl: null,
          }}
          displayEmpty
          value={locale}
          onChange={(e) => { setLocale(e.target.value); }}
          name="locale"
          classes={{ select: classes.select }}
          className={classes.selectEmpty}
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
  classes: PropTypes.objectOf(PropTypes.string),
  locale: PropTypes.string,
  setLocale: PropTypes.func,
  userLanguages: PropTypes.arrayOf(PropTypes.string),
};

LocalePicker.defaultProps = {
  availableLocales: [],
  classes: {},
  locale: '',
  setLocale: undefined,
  userLanguages: [],
};
