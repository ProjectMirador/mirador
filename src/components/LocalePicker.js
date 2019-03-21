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
      locale,
      setLocale,
    } = this.props;

    if (!setLocale || availableLocales.length < 2) return <></>;
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
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  locale: PropTypes.string,
  setLocale: PropTypes.func,
};

LocalePicker.defaultProps = {
  availableLocales: [],
  classes: {},
  locale: '',
  setLocale: undefined,
};
