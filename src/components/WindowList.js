import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import PropTypes from 'prop-types';
import ns from '../config/css-ns';

/**
 */
export class WindowList extends Component {
  /**
   * Get the title for a window from its manifest title
   * @private
   */
  titleContent(window) {
    const { manifests, t } = this.props;

    if (window.manifestId
        && manifests[window.manifestId]
        && manifests[window.manifestId].manifestation) {
      return manifests[window.manifestId].manifestation.getLabel().map(label => label.value)[0];
    }
    return t('untitled');
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      containerId, handleClose, anchorEl, windows, focusWindow, t,
    } = this.props;
    return (
      <Menu
        id="window-list-menu"
        container={document.querySelector(`#${containerId} .${ns('viewer')}`)}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <ListSubheader>
          {t('openWindows')}
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
  containerId: PropTypes.string.isRequired,
  focusWindow: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  windows: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  manifests: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
};

WindowList.defaultProps = {
  anchorEl: null,
  t: key => key,
};
