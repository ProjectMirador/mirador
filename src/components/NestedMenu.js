import { Component } from 'react';
import PropTypes from 'prop-types';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import ExpandLess from '@mui/icons-material/ExpandLessSharp';
import ExpandMore from '@mui/icons-material/ExpandMoreSharp';

/**
 * NestedMenu ~ A presentation component to render a menu item and have
 * it control the visibility of the MUI List passed in as the children
*/
export class NestedMenu extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);

    this.state = {
      nestedMenuIsOpen: false,
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  /**
   * handleMenuClick toggles the nestedMenuIsOpen state
   */
  handleMenuClick() {
    const { nestedMenuIsOpen } = this.state;

    this.setState({
      nestedMenuIsOpen: !nestedMenuIsOpen,
    });
  }

  /**
   * Returns the rendered component.  Spreads unused props to MenuItem
  */
  render() {
    const { nestedMenuIsOpen } = this.state;
    const {
      children, icon, label, ...otherProps
    } = this.props;
    return (
      <>
        <MenuItem
          aria-expanded={nestedMenuIsOpen}
          onClick={this.handleMenuClick}
          divider={nestedMenuIsOpen}
          {...otherProps}
        >
          {icon && (<ListItemIcon>{icon}</ListItemIcon>)}
          <ListItemText primaryTypographyProps={{ variant: 'body1' }}>
            {label}
          </ListItemText>
          {
            nestedMenuIsOpen
              ? <ExpandLess />
              : <ExpandMore />
          }
        </MenuItem>
        {nestedMenuIsOpen && children}
      </>
    );
  }
}

NestedMenu.propTypes = {
  children: PropTypes.element.isRequired,
  icon: PropTypes.element,
  label: PropTypes.string.isRequired,
};

NestedMenu.defaultProps = {
  icon: null,
};
