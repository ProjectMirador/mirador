import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import PropTypes from 'prop-types';

/**
 */
class WindowList extends Component {
  /**
   * Get the title for a window from its manifest title
   * @private
   */
  titleContent(window) {
    const { manifests } = this.props;

    if (window.manifestId
        && manifests[window.manifestId]
        && manifests[window.manifestId].manifestation) {
      return manifests[window.manifestId].manifestation.getLabel().map(label => label.value)[0];
    }
    return '[Untitled]';
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      handleClose, anchorEl, windows, focusWindow,
    } = this.props;
    return (
      <Menu id="window-list-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <ListSubheader>
          <Button color="inherit" aria-label="Close Menu" onClick={handleClose} align="right" style={{ float: 'right' }}>&times;</Button>
          Open windows
        </ListSubheader>
        {
          Object.values(windows).map(window => (
            <MenuItem
              key={window.id}
              onClick={(e) => { focusWindow(window.id); handleClose(e); }}
            >
              {
                this.titleContent(window)
              }
            </MenuItem>
          ))
        }
      </Menu>
    );
  }
}

WindowList.propTypes = {
  focusWindow: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.object,
  windows: PropTypes.object.isRequired,
  manifests: PropTypes.object.isRequired,
};

WindowList.defaultProps = {
  anchorEl: null,
};

export default WindowList;
