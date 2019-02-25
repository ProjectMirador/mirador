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
export default class NestedMenu extends Component {
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
   * Returns the rendered component
  */
  render() {
    const { nestedMenuIsOpen } = this.state;
    const { children, icon, label } = this.props;
    return (
      <>
        <MenuItem onClick={this.handleMenuClick}>
          <ListItemIcon>{icon}</ListItemIcon>
          {/* ListItemText adds left padding and we want this to line-up with menu items */}
          <ListItemText style={{ paddingLeft: 0 }}>
            <Typography varient="inherit">{label}</Typography>
          </ListItemText>
          {
            nestedMenuIsOpen
              ? <ExpandLess />
              : <ExpandMore />
          }
        </MenuItem>
        <Collapse in={nestedMenuIsOpen} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      </>
    );
  }
}

NestedMenu.propTypes = {
  children: PropTypes.element.isRequired,
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
};
