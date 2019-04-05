import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
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
    const { titles, t } = this.props;

    return titles[window.id] || t('untitled');
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
        <ListSubheader role="presentation" selected={false} disabled tabIndex="-1">
          {t('openWindows')}
        </ListSubheader>
        {
          Object.values(windows).map((window, i) => (
            <MenuItem
              key={window.id}
              selected={i === 0}
              onClick={(e) => { focusWindow(window.id, true); handleClose(e); }}
            >
              <ListItemText primaryTypographyProps={{ variant: 'body1' }}>
                {
                  this.titleContent(window)
                }
              </ListItemText>
            </MenuItem>
          ))
        }
      </Menu>
    );
  }
}

WindowList.propTypes = {
  anchorEl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  containerId: PropTypes.string.isRequired,
  focusWindow: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  t: PropTypes.func,
  titles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  windows: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

WindowList.defaultProps = {
  anchorEl: null,
  t: key => key,
  titles: {},
};
