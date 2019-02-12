import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import WindowThumbnailSettings from '../containers/WindowThumbnailSettings';

/**
 * WindowTopMenu
 * @param props
 * @returns {*}
 * @constructor
 */
function WindowTopMenu(props) {
  const { handleClose, anchorEl, windowId } = props;

  return (
    <>
      <Menu id={`window-menu_${windowId}`} anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <ListItem>
          <WindowThumbnailSettings windowId={windowId} />
        </ListItem>
        <Divider />
      </Menu>
    </>
  );
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
