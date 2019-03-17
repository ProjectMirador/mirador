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
import { MiradorMenuButton } from './MiradorMenuButton';
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
      maximizeWindow, maximized, minimizeWindow, focused,
    } = this.props;
    return (
      <AppBar
        className={classNames(classes.windowTopBarStyle, focused ? classes.focused : null, ns('window-top-bar'))}
        color="secondary"
        position="static"
      >
        <Toolbar disableGutters variant="dense">
          <MiradorMenuButton
            aria-label={t('toggleWindowSideBar')}
            onClick={toggleWindowSideBar}
          >
            <MenuIcon />
          </MiradorMenuButton>
          <Typography variant="h2" noWrap className={classes.title}>
            {manifestTitle}
          </Typography>
          <WindowTopMenuButton
            windowId={windowId}
          />
          <MiradorMenuButton
            aria-label={(maximized ? t('minimizeWindow') : t('maximizeWindow'))}
            onClick={(maximized ? minimizeWindow : maximizeWindow)}
          >
            {(maximized ? <FullscreenExitIcon /> : <FullscreenIcon />)}
          </MiradorMenuButton>
          <MiradorMenuButton
            aria-label={t('closeWindow')}
            onClick={removeWindow}
          >
            <CloseIcon />
          </MiradorMenuButton>
        </Toolbar>
      </AppBar>
    );
  }
}

WindowTopBar.propTypes = {
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
  manifestTitle: '',
  maximizeWindow: () => {},
  maximized: false,
  minimizeWindow: () => {},
  t: key => key,
  focused: false,
};
