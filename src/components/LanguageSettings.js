import { Component } from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import CheckIcon from '@mui/icons-material/CheckSharp';
import PropTypes from 'prop-types';

/**
 * LanguageSettings ~ the workspace sub menu to change the language
 * of the application
*/
export class LanguageSettings extends Component {
  /**
   * Returns the rendered component
  */
  render() {
    const {
      handleClick, languages,
    } = this.props;

    return (
      <>
        {
          languages.map(language => (
            <MenuItem
              aria-selected={language.current}
              key={language.locale}
              onClick={() => { handleClick(language.locale); }}
            >
              <ListItemIcon>
                {
                  language.current && <CheckIcon />
                }
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: 'body1' }}>
                {language.label}
              </ListItemText>
            </MenuItem>
          ))
        }
      </>
    );
  }
}

LanguageSettings.propTypes = {
  handleClick: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      current: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
      locale: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
