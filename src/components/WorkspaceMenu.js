import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import SaveAltIcon from '@material-ui/icons/SaveAltSharp';
import SettingsIcon from '@material-ui/icons/SettingsSharp';
import PropTypes from 'prop-types';
import LanguageSettings from '../containers/LanguageSettings';
import { NestedMenu } from './NestedMenu';
import WindowList from '../containers/WindowList';
import WorkspaceSettings from '../containers/WorkspaceSettings';
import WorkspaceSelectionDialog from '../containers/WorkspaceSelectionDialog';
import WorkspaceExport from '../containers/WorkspaceExport';
import ns from '../config/css-ns';

/**
 */
export class WorkspaceMenu extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);
    this.state = {
      exportWorkspace: {},
      settings: {},
      toggleZoom: {},
      windowList: {},
      workspaceSelection: {},
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
   * @private
   */
  handleZoomToggleClick() {
    const { toggleZoomControls, showZoomControls } = this.props;
    toggleZoomControls(!showZoomControls);
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      containerId,
      handleClose,
      anchorEl,
      t,
      showZoomControls,
    } = this.props;

    const {
      windowList,
      toggleZoom,
      settings,
      exportWorkspace,
      workspaceSelection,
    } = this.state;

    const container = document.querySelector(`#${containerId} .${ns('viewer')}`);

    return (
      <>
        <Menu
          id="workspace-menu"
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
            divider
            onClick={(e) => { this.handleMenuItemClick('windowList', e); handleClose(e); }}
            aria-owns={windowList.anchorEl ? 'window-list-menu' : undefined}
          >
            <Typography variant="body1">{t('listAllOpenWindows')}</Typography>
          </MenuItem>
          <MenuItem
            aria-haspopup="true"
            onClick={(e) => { this.handleZoomToggleClick(e); handleClose(e); }}
            aria-owns={toggleZoom.anchorEl ? 'toggle-zoom-menu' : undefined}
          >
            <Typography variant="body1">
              { showZoomControls ? t('hideZoomControls') : t('showZoomControls') }
            </Typography>
          </MenuItem>
          <MenuItem
            aria-haspopup="true"
            onClick={(e) => { this.handleMenuItemClick('workspaceSelection', e); handleClose(e); }}
            aria-owns={workspaceSelection.anchorEl ? 'workspace-selection' : undefined}
          >
            <Typography variant="body1">{t('selectWorkspaceMenu')}</Typography>
          </MenuItem>

          <NestedMenu label={t('language')} divider>
            <LanguageSettings afterSelect={handleClose} />
          </NestedMenu>

          <MenuItem
            aria-haspopup="true"
            onClick={(e) => { this.handleMenuItemClick('settings', e); handleClose(e); }}
            aria-owns={settings.AnchorEl ? 'workspace-settings' : undefined}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <Typography variant="body1">{t('settings')}</Typography>
          </MenuItem>
          <MenuItem
            aria-haspopup="true"
            onClick={(e) => { this.handleMenuItemClick('exportWorkspace', e); handleClose(e); }}
            aria-owns={exportWorkspace.AnchorEl ? 'workspace-export' : undefined}
          >
            <ListItemIcon>
              <SaveAltIcon />
            </ListItemIcon>
            <Typography variant="body1">{t('downloadExportWorkspace')}</Typography>
          </MenuItem>
        </Menu>
        <WindowList
          anchorEl={windowList.anchorEl}
          open={Boolean(windowList.anchorEl)}
          handleClose={this.handleMenuItemClose('windowList')}
        />
        <WorkspaceSettings
          open={Boolean(toggleZoom.open)}
          handleClose={this.handleMenuItemClose('toggleZoom')}
        />
        <WorkspaceSettings
          open={Boolean(settings.open)}
          container={container}
          handleClose={this.handleMenuItemClose('settings')}
        />
        <WorkspaceSelectionDialog
          open={Boolean(workspaceSelection.open)}
          container={container}
          handleClose={this.handleMenuItemClose('workspaceSelection')}
        />
        <WorkspaceExport
          open={Boolean(exportWorkspace.open)}
          container={container}
          handleClose={this.handleMenuItemClose('exportWorkspace')}
        />
      </>
    );
  }
}

WorkspaceMenu.propTypes = {
  anchorEl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  containerId: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  showZoomControls: PropTypes.bool,
  t: PropTypes.func,
  toggleZoomControls: PropTypes.func,
};

WorkspaceMenu.defaultProps = {
  anchorEl: null,
  showZoomControls: false,
  t: key => key,
  toggleZoomControls: () => {},
};
