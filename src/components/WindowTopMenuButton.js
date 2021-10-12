import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WindowTopMenu from '../containers/WindowTopMenu';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import WindowOptionsIcon from './icons/WindowOptionsIcon';
import { Badge } from '@material-ui/core';

/**
 */
export class WindowTopMenuButton extends Component {
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
    const { classes, viewIsModified, t, windowId } = this.props;
    const { anchorEl } = this.state;

    return (
      <>
        <MiradorMenuButton
          aria-expanded={!!anchorEl}
          aria-haspopup="true"
          aria-label={t('windowMenu')}
          aria-owns={anchorEl ? `window-menu_${windowId}` : undefined}
          className={anchorEl ? classes.ctrlBtnSelected : null}
          onClick={this.handleMenuClick}
        >
          <Badge classes={{ badge: classes.badge }} invisible={!viewIsModified} variant="dot">
            <WindowOptionsIcon />
          </Badge>
        </MiradorMenuButton>
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
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  viewIsModified: PropTypes.bool,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

WindowTopMenuButton.defaultProps = {
  shiftBookView: false,
  t: key => key,
};
