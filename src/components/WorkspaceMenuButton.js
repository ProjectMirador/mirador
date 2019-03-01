import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/MenuSharp';
import PropTypes from 'prop-types';
import WorkspaceMenu from '../containers/WorkspaceMenu';

/**
 */
export class WorkspaceMenuButton extends Component {
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
    const { classes, t } = this.props;
    const { anchorEl } = this.state;

    return (
      <>
        <IconButton
          color="default"
          id="menuBtn"
          aria-label={t('menu')}
          className={classes.ctrlBtn}
          aria-haspopup="true"
          onClick={this.handleMenuClick}
          aria-owns={anchorEl ? 'workspace-menu' : undefined}
        >
          <MenuIcon />
        </IconButton>
        <WorkspaceMenu
          anchorEl={anchorEl}
          handleClose={this.handleMenuClose}
        />
      </>
    );
  }
}

WorkspaceMenuButton.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
};

WorkspaceMenuButton.defaultProps = {
  t: key => key,
};
