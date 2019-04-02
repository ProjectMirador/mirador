import React, { Component } from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/CheckSharp';
import PropTypes from 'prop-types';

/**
 * LanguageSettings ~ the workspace sub menu to change the language
 * of the application
*/
export class LanguageSettings extends Component {
  /** */
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  /** */
  handleClick(e) {
    const { handleClick } = this.props;
    handleClick(e.currentTarget.dataset.locale);
  }

  /**
   * Returns the rendered component
  */
  render() {
    const {
      languages,
    } = this.props;

    return (
      <>
        {
          languages.map(language => (
            <MenuItem
              button={!language.current}
              key={language.locale}
              data-locale={language.locale}
              onClick={this.handleClick}
            >
              {
                language.current
                  && <ListItemIcon><CheckIcon /></ListItemIcon>
              }
              <ListItemText inset>
                <Typography variant="body1">
                  {language.label}
                </Typography>
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
