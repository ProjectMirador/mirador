import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/MenuSharp';
import CloseIcon from '@material-ui/icons/CloseSharp';
import FullscreenIcon from '@material-ui/icons/FullscreenSharp';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExitSharp';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import classNames from 'classnames';
import WindowTopMenuButton from '../containers/WindowTopMenuButton';
import WindowTopBarButtons from '../containers/WindowTopBarButtons';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import ns from '../config/css-ns';


/**
 * WindowTopBar
 */
export class WindowTopBar extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      removeWindow, windowId, classes, toggleWindowSideBar, t, manifestTitle,
      maximizeWindow, maximized, minimizeWindow, focused, allowClose, allowMaximize,
    } = this.props;
    return (
      <AppBar position="relative">
        <Toolbar disableGutters className={classNames(classes.windowTopBarStyle, focused ? classes.focused : null, ns('window-top-bar'))} variant="dense">
          <MiradorMenuButton
            aria-label={t('toggleWindowSideBar')}
            color="inherit"
            onClick={toggleWindowSideBar}
          >
            <MenuIcon />
          </MiradorMenuButton>
          <Typography variant="h2" noWrap color="inherit" className={classes.title}>
            {manifestTitle}
          </Typography>
          <WindowTopBarButtons windowId={windowId} />
          <WindowTopMenuButton className={ns('window-menu-btn')} windowId={windowId} />
          {allowMaximize && (
            <MiradorMenuButton
              aria-label={(maximized ? t('minimizeWindow') : t('maximizeWindow'))}
              className={ns('window-maximize')}
              color="inherit"
              onClick={(maximized ? minimizeWindow : maximizeWindow)}
            >
              {(maximized ? <FullscreenExitIcon /> : <FullscreenIcon />)}
            </MiradorMenuButton>
          )}
          {allowClose && (
            <MiradorMenuButton
              aria-label={t('closeWindow')}
              className={ns('window-close')}
              color="inherit"
              onClick={removeWindow}
            >
              <CloseIcon />
            </MiradorMenuButton>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

WindowTopBar.propTypes = {
  allowClose: PropTypes.bool,
  allowMaximize: PropTypes.bool,
  manifestTitle: PropTypes.string,
  maximizeWindow: PropTypes.func,
  maximized: PropTypes.bool,
  minimizeWindow: PropTypes.func,
  removeWindow: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  toggleWindowSideBar: PropTypes.func.isRequired,
  t: PropTypes.func,
  focused: PropTypes.bool,
};

WindowTopBar.defaultProps = {
  allowClose: true,
  allowMaximize: true,
  manifestTitle: '',
  maximizeWindow: () => {},
  maximized: false,
  minimizeWindow: () => {},
  t: key => key,
  focused: false,
};
