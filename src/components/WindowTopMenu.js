import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import PropTypes from 'prop-types';
import WindowThumbnailSettings from '../containers/WindowThumbnailSettings';
import WindowViewSettings from '../containers/WindowViewSettings';
import ns from '../config/css-ns';

/**
 */
export class WindowTopMenu extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      containerId, handleClose, anchorEl, windowId,
    } = this.props;
    // const {} = this.state;

    return (
      <>
        <Menu
          id={`window-menu_${windowId}`}
          container={document.querySelector(`#${containerId} .${ns('viewer')}`)}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          getContentAnchorEl={null}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <WindowViewSettings windowId={windowId} handleClose={handleClose} />
          <WindowThumbnailSettings windowId={windowId} handleClose={handleClose} />
        </Menu>
      </>
    );
  }
}

WindowTopMenu.propTypes = {
  containerId: PropTypes.string.isRequired,
  windowId: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

WindowTopMenu.defaultProps = {
  anchorEl: null,
};
