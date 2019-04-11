import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import LanguageSettings from '../containers/LanguageSettings';
import { NestedMenu } from './NestedMenu';
import WorkspaceSelectionDialog from '../containers/WorkspaceSelectionDialog';
import ns from '../config/css-ns';
import ChangeThemeDialog from '../containers/ChangeThemeDialog';

/**
 */
export class WorkspaceMenu extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);
    this.state = {
      changeTheme: {},
      toggleZoom: {},
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
      isWorkspaceAddVisible,
      t,
      showZoomControls,
    } = this.props;

    const {
      changeTheme,
      toggleZoom,
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
            disabled={isWorkspaceAddVisible}
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

          <NestedMenu label={t('language')}>
            <LanguageSettings afterSelect={handleClose} />
          </NestedMenu>
          <MenuItem
            aria-haspopup="true"
            onClick={(e) => { this.handleMenuItemClick('changeTheme', e); handleClose(e); }}
            aria-owns={changeTheme.anchorEl ? 'change-theme' : undefined}
          >
            <Typography variant="body1">{t('changeTheme')}</Typography>
          </MenuItem>
        </Menu>
        {Boolean(changeTheme.open) && (
          <ChangeThemeDialog
            container={container}
            handleClose={this.handleMenuItemClose('changeTheme')}
            open={Boolean(changeTheme.open)}
          />
        )}
        {Boolean(workspaceSelection.open) && (
          <WorkspaceSelectionDialog
            open={Boolean(workspaceSelection.open)}
            container={container}
            handleClose={this.handleMenuItemClose('workspaceSelection')}
          />
        )}
      </>
    );
  }
}

WorkspaceMenu.propTypes = {
  anchorEl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  containerId: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  isWorkspaceAddVisible: PropTypes.bool,
  showZoomControls: PropTypes.bool,
  t: PropTypes.func,
  toggleZoomControls: PropTypes.func,
};

WorkspaceMenu.defaultProps = {
  anchorEl: null,
  isWorkspaceAddVisible: false,
  showZoomControls: false,
  t: key => key,
  toggleZoomControls: () => {},
};
