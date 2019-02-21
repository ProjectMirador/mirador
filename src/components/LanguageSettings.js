import React, { Component } from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/CheckSharp';
import PropTypes from 'prop-types';

/**
 * LanguageSettings ~ the workspace sub menu to change the language
 * of the application
*/
export default class LanguageSettings extends Component {
  /**
   * Returns the rendered component
  */
  render() {
    const {
      handleClick, languages, active,
    } = this.props;

    return (
      <List>
        {
          Object.keys(languages).map(language => (
            <MenuItem
              button={!(active(language))}
              key={language}
              onClick={() => { handleClick(language); }}
            >
              {
                active(language)
                  && <ListItemIcon><CheckIcon /></ListItemIcon>
              }
              <ListItemText inset>
                <Typography variant="inherit">
                  {languages[language]}
                </Typography>
              </ListItemText>
            </MenuItem>
          ))
        }
      </List>
    );
  }
}

LanguageSettings.propTypes = {
  active: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  languages: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
