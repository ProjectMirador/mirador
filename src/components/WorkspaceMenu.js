import { Component } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import LanguageSettings from '../containers/LanguageSettings';
import { NestedMenu } from './NestedMenu';
import WorkspaceSelectionDialog from '../containers/WorkspaceSelectionDialog';
import ChangeThemeDialog from '../containers/ChangeThemeDialog';
import { PluginHook } from './PluginHook';

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
      container,
      handleClose,
      showThemePicker,
      isWorkspaceAddVisible,
      t,
      showZoomControls,
      toggleZoomControls,
      ...rest
    } = this.props;
    const menuProps = { ...rest };
    delete menuProps.tReady;

    const {
      changeTheme,
      toggleZoom,
      workspaceSelection,
    } = this.state;

    return (
      <>
        <Menu
          container={container?.current}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
          transformOrigin={{
            horizontal: 'left',
            vertical: 'top',
          }}
          onClose={handleClose}
          {...menuProps}
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
            aria-expanded={Boolean(workspaceSelection.open)}
            onClick={(e) => { this.handleMenuItemClick('workspaceSelection', e); handleClose(e); }}
            aria-owns={workspaceSelection.anchorEl ? 'workspace-selection' : undefined}
          >
            <Typography variant="body1">{t('selectWorkspaceMenu')}</Typography>
          </MenuItem>

          <NestedMenu label={t('language')}>
            <LanguageSettings afterSelect={handleClose} />
          </NestedMenu>
          { showThemePicker && (
            <MenuItem
              aria-haspopup="true"
              onClick={(e) => { this.handleMenuItemClick('changeTheme', e); handleClose(e); }}
              aria-owns={changeTheme.anchorEl ? 'change-theme' : undefined}
            >
              <Typography variant="body1">{t('changeTheme')}</Typography>
            </MenuItem>
          )}
          <PluginHook {...this.props} />
        </Menu>
        {Boolean(changeTheme.open) && (
          <ChangeThemeDialog
            container={container?.current}
            handleClose={this.handleMenuItemClose('changeTheme')}
            open={Boolean(changeTheme.open)}
          />
        )}
        {Boolean(workspaceSelection.open) && (
          <WorkspaceSelectionDialog
            open={Boolean(workspaceSelection.open)}
            container={container?.current}
            handleClose={this.handleMenuItemClose('workspaceSelection')}
          />
        )}
      </>
    );
  }
}

WorkspaceMenu.propTypes = {
  container: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  handleClose: PropTypes.func.isRequired,
  isWorkspaceAddVisible: PropTypes.bool,
  showThemePicker: PropTypes.bool,
  showZoomControls: PropTypes.bool,
  t: PropTypes.func,
  toggleZoomControls: PropTypes.func,
};

WorkspaceMenu.defaultProps = {
  container: null,
  isWorkspaceAddVisible: false,
  showThemePicker: false,
  showZoomControls: false,
  t: key => key,
  toggleZoomControls: () => {},
};
