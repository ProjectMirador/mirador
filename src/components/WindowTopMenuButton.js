import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import WindowTopMenu from '../containers/WindowTopMenu';

/**
 */
class WindowTopMenuButton extends Component {
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
    const { classes, t, windowId } = this.props;
    const { anchorEl } = this.state;

    return (
      <>
        <IconButton
          color="inherit"
          aria-label={t('menu')}
          className={classes.ctrlBtn}
          aria-haspopup="true"
          onClick={this.handleMenuClick}
          aria-owns={anchorEl ? `window-menu_${windowId}` : undefined}
        >
          <MoreVertIcon />
        </IconButton>
        <WindowTopMenu
          windowId={windowId}
          anchorEl={anchorEl}
          handleClose={this.handleMenuClose}
        />
      </>
    );
  }
}

WindowTopMenuButton.propTypes = {
  windowId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
};

WindowTopMenuButton.defaultProps = {
  t: key => key,
};

/**
 * @private
 */
const styles = theme => ({
  ctrlBtn: {
    margin: theme.spacing.unit,
  },
});

export default withStyles(styles)(WindowTopMenuButton);
