import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLessSharp';
import ExpandMore from '@material-ui/icons/ExpandMoreSharp';

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
        <MenuItem onClick={this.handleMenuClick} divider={nestedMenuIsOpen} {...otherProps}>
          {icon
            && (<ListItemIcon>{icon}</ListItemIcon>)
          }
          <ListItemText>
            <Typography varient="body1">{label}</Typography>
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
