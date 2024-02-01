import { Component } from 'react';
import PropTypes from 'prop-types';
import ImportIcon from '@mui/icons-material/Input';
import SaveAltIcon from '@mui/icons-material/SaveAltSharp';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import WorkspaceExport from '../containers/WorkspaceExport';
import WorkspaceImport from '../containers/WorkspaceImport';
import { PluginHook } from './PluginHook';

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
      anchorEl, container, handleClose, t, open,
    } = this.props;
    const { exportWorkspace, importWorkspace } = this.state;

    return (
      <>
        <Menu
          id="workspace-options-menu"
          container={container?.current}
          anchorEl={anchorEl}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
          transformOrigin={{
            horizontal: 'left',
            vertical: 'top',
          }}
          open={open}
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
            container={container?.current}
            handleClose={this.handleMenuItemClose('exportWorkspace')}
          />
        )}
        {Boolean(importWorkspace.open) && (
          <WorkspaceImport
            open={Boolean(importWorkspace.open)}
            container={container?.current}
            handleClose={this.handleMenuItemClose('importWorkspace')}
          />
        )}
      </>
    );
  }
}

WorkspaceOptionsMenu.propTypes = {
  anchorEl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  container: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

WorkspaceOptionsMenu.defaultProps = {
  anchorEl: null,
  container: null,
  open: false,
};
