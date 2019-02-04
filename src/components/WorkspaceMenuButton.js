import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import WorkspaceMenu from './WorkspaceMenu';

/**
 */
class WorkspaceMenuButton extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  /**
   * @private
   */
  handleMenuClick(event) {
    this.setState({
      anchorEl: event.currentTarget,
    });
  }

  /**
   * @private
   */
  handleMenuClose() {
    this.setState({
      anchorEl: null,
    });
  }

  /**
   * render
   * @return
   */
  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <>
        <ListItem>
          <IconButton
            color="primary"
            id="menuBtn"
            aria-label="Menu"
            className={classes.ctrlBtn}
            aria-haspopup="true"
            onClick={this.handleMenuClick}
            aria-owns={anchorEl ? 'workspace-menu' : undefined}
          >
            <MenuIcon />
          </IconButton>
        </ListItem>
        <WorkspaceMenu
          anchorEl={anchorEl}
          handleClose={this.handleMenuClose}
        />
      </>
    );
  }
}

WorkspaceMenuButton.propTypes = {
  classes: PropTypes.shape({
    ctrlBtn: PropTypes.string,
  }).isRequired,
};

/**
 * @private
 */
const styles = theme => ({
  ctrlBtn: {
    margin: theme.spacing.unit,
  },
});

export default withStyles(styles)(WorkspaceMenuButton);
