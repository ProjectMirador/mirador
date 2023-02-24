import { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PropTypes from 'prop-types';

/**
 */
export class WindowList extends Component {
  /**
   * Given the menuElement passed in by the onEntering callback,
   * find the 2nd ListItem element (avoiding the header) and focus it
  */
  static focus2ndListIitem(menuElement) {
    if (!menuElement.querySelectorAll('li') || menuElement.querySelectorAll('li').length < 2) return;

    menuElement.querySelectorAll('li')[1].focus(); // The 2nd LI
  }

  /**
   * Get the title for a window from its manifest title
   * @private
   */
  titleContent(windowId) {
    const { titles, t } = this.props;

    return titles[windowId] || t('untitled');
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      container, handleClose, anchorEl, windowIds, focusWindow, t,
    } = this.props;

    return (
      <Menu
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        transformOrigin={{
          horizontal: 'left',
          vertical: 'top',
        }}
        id="window-list-menu"
        container={container?.current}
        disableAutoFocusItem
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionProps={{
          onEntering: WindowList.focus2ndListIitem,
        }}
      >
        <ListSubheader role="presentation" selected={false} disabled tabIndex="-1">
          {t('openWindows')}
        </ListSubheader>
        {
          windowIds.map((windowId, i) => (
            <MenuItem
              key={windowId}
              onClick={(e) => { focusWindow(windowId, true); handleClose(e); }}
            >
              <ListItemText primaryTypographyProps={{ variant: 'body1' }}>
                {
                  this.titleContent(windowId)
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
  container: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  focusWindow: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  t: PropTypes.func,
  titles: PropTypes.objectOf(PropTypes.string),
  windowIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

WindowList.defaultProps = {
  anchorEl: null,
  container: null,
  t: key => key,
  titles: {},
};
