import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImportIcon from '@material-ui/icons/Input';
import SaveAltIcon from '@material-ui/icons/SaveAltSharp';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import WorkspaceExport from '../containers/WorkspaceExport';
import WorkspaceImport from '../containers/WorkspaceImport';
import { PluginHook } from './PluginHook';
import ns from '../config/css-ns';

/**
 * WorkspaceOptionsMenu ~ the menu for workspace options such as import/export
*/
export class WorkspaceOptionsMenu extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);
    this.state = {
      exportWorkspace: {},
      importWorkspace: {},
    };
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleMenuItemClose = this.handleMenuItemClose.bind(this);
  }

  /**
   * @private
   */
  handleMenuItemClick(item) {
    const obj = {};
    obj[item] = {};
    obj[item].open = true;
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
      this.setState(obj);
    };
  }

  /**
   * Returns the rendered component
  */
  render() {
    const {
      anchorEl, containerId, handleClose, t,
    } = this.props;
    const { exportWorkspace, importWorkspace } = this.state;
    const container = document.querySelector(`#${containerId} .${ns('viewer')}`);

    return (
      <>
        <Menu
          id="workspace-options-menu"
          container={container}
          anchorEl={anchorEl}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
          transformOrigin={{
            horizontal: 'left',
            vertical: 'top',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            aria-haspopup="true"
            onClick={() => { this.handleMenuItemClick('exportWorkspace'); handleClose(); }}
            aria-owns={exportWorkspace.open ? 'workspace-export' : undefined}
          >
            <ListItemIcon>
              <SaveAltIcon />
            </ListItemIcon>
            <Typography variant="body1">{t('downloadExportWorkspace')}</Typography>
          </MenuItem>
          <MenuItem
            aria-haspopup="true"
            id="workspace-menu-import"
            onClick={() => { this.handleMenuItemClick('importWorkspace'); handleClose(); }}
            aria-owns={exportWorkspace.open ? 'workspace-import' : undefined}
          >
            <ListItemIcon>
              <ImportIcon />
            </ListItemIcon>
            <Typography variant="body1">{t('importWorkspace')}</Typography>
          </MenuItem>
          <PluginHook {...this.props} />
        </Menu>
        {Boolean(exportWorkspace.open) && (
          <WorkspaceExport
            open={Boolean(exportWorkspace.open)}
            container={container}
            handleClose={this.handleMenuItemClose('exportWorkspace')}
          />
        )}
        {Boolean(importWorkspace.open) && (
          <WorkspaceImport
            open={Boolean(importWorkspace.open)}
            container={container}
            handleClose={this.handleMenuItemClose('importWorkspace')}
          />
        )}
      </>
    );
  }
}

WorkspaceOptionsMenu.propTypes = {
  anchorEl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  containerId: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

WorkspaceOptionsMenu.defaultProps = {
  anchorEl: null,
};
