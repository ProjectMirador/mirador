import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import SettingsIcon from '@material-ui/icons/Settings';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import PropTypes from 'prop-types';
import WindowList from '../containers/WindowList';
import WorkspaceSettings from './WorkspaceSettings';
import WorkspaceExport from '../containers/WorkspaceExport';

/**
 */
class WorkspaceMenu extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);
    this.state = {
      windowList: {},
      settings: {},
      exportWorkspace: {},
    };
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleMenuItemClose = this.handleMenuItemClose.bind(this);
  }

  /**
   * @private
   */
  handleMenuItemClick(item, event) {
    const obj = {};
    obj[item] = {};
    obj[item].open = true;
    obj[item].anchorEl = event.currentTarget;
    this.setState(obj);
  }

  /**
   * @private
   */
  handleMenuItemClose(item) {
    return (event) => {
      const obj = {};
      obj[item] = {};
      obj[item].open = false;
      obj[item].anchorEl = null;
      this.setState(obj);
    };
  }

  /**
   * render
   * @return
   */
  render() {
    const { handleClose, anchorEl } = this.props;
    const { windowList, settings, exportWorkspace } = this.state;

    return (
      <>
        <Menu id="workspace-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem
            aria-haspopup="true"
            onClick={(e) => { this.handleMenuItemClick('windowList', e); handleClose(e); }}
            aria-owns={windowList.anchorEl ? 'window-list-menu' : undefined}
          >
            <ListItemIcon>
              <ViewHeadlineIcon />
            </ListItemIcon>
            <Typography varient="inherit">List all open windows</Typography>
          </MenuItem>
          <Divider />
          <MenuItem
            aria-haspopup="true"
            onClick={(e) => { this.handleMenuItemClick('settings', e); handleClose(e); }}
            aria-owns={settings.AnchorEl ? 'workspace-settings' : undefined}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <Typography varient="inherit">Settings</Typography>
          </MenuItem>
          <MenuItem
            aria-haspopup="true"
            onClick={(e) => { this.handleMenuItemClick('exportWorkspace', e); handleClose(e); }}
            aria-owns={exportWorkspace.AnchorEl ? 'workspace-export' : undefined}
          >
            <ListItemIcon>
              <SaveAltIcon />
            </ListItemIcon>
            <Typography varient="inherit">Download/export workspace</Typography>
          </MenuItem>
        </Menu>
        <WindowList
          anchorEl={windowList.anchorEl}
          open={Boolean(windowList.anchorEl)}
          handleClose={this.handleMenuItemClose('windowList')}
        />
        <WorkspaceSettings
          open={Boolean(settings.open)}
          handleClose={this.handleMenuItemClose('settings')}
        />
        <WorkspaceExport
          open={Boolean(exportWorkspace.open)}
          handleClose={this.handleMenuItemClose('exportWorkspace')}
        />
      </>
    );
  }
}

WorkspaceMenu.propTypes = {
  handleClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

WorkspaceMenu.defaultProps = {
  anchorEl: null,
};

export default WorkspaceMenu;
