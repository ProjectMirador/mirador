import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import WindowThumbnailSettings from '../containers/WindowThumbnailSettings';
import WindowViewSettings from '../containers/WindowViewSettings';
import { WorkspaceContext } from '../contexts';

/**
 */
class WindowTopMenu extends Component {
  /**
   * render
   * @return
   */
  render() {
    const { handleClose, anchorEl, windowId } = this.props;
    // const {} = this.state;

    return (
      <WorkspaceContext.Consumer>
        {workspaceRef => (
          <Menu id={`window-menu_${windowId}`} container={workspaceRef.current} anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <ListItem>
              <WindowViewSettings windowId={windowId} />
            </ListItem>
            <Divider />
            <ListItem>
              <WindowThumbnailSettings windowId={windowId} />
            </ListItem>
            <Divider />
          </Menu>
        )}
      </WorkspaceContext.Consumer>
    );
  }
}

WindowTopMenu.propTypes = {
  windowId: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

WindowTopMenu.defaultProps = {
  anchorEl: null,
};

export default WindowTopMenu;
