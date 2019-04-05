import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/MenuSharp';
import CloseIcon from '@material-ui/icons/CloseSharp';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import classNames from 'classnames';
import WindowTopMenuButton from '../../containers/window/WindowTopMenuButton';
import WindowTopBarButtons from '../../containers/window/WindowTopBarButtons';
import MiradorMenuButton from '../../containers/MiradorMenuButton';
import WindowMaxIcon from '../icons/WindowMaxIcon';
import WindowMinIcon from '../icons/WindowMinIcon';
import ns from '../../config/css-ns';


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
      removeWindow, windowId, classes, toggleWindowSideBar, t, manifestTitle, windowDraggable,
      maximizeWindow, maximized, minimizeWindow, focused, allowClose, allowMaximize,
    } = this.props;

    return (
      <AppBar position="relative">
        <nav aria-label={t('windowNavigation')}>
          <Toolbar
            disableGutters
            className={classNames(
              classes.windowTopBarStyle,
              windowDraggable ? classes.windowTopBarStyleDraggable : null,
              focused ? classes.focused : null,
              ns('window-top-bar'),
            )}
            variant="dense"
          >
            <MiradorMenuButton
              aria-label={t('toggleWindowSideBar')}
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
                onClick={(maximized ? minimizeWindow : maximizeWindow)}
              >
                {(maximized ? <WindowMinIcon /> : <WindowMaxIcon />)}
              </MiradorMenuButton>
            )}
            {allowClose && (
              <MiradorMenuButton
                aria-label={t('closeWindow')}
                className={ns('window-close')}
                onClick={removeWindow}
              >
                <CloseIcon />
              </MiradorMenuButton>
            )}
          </Toolbar>
        </nav>
      </AppBar>
    );
  }
}

WindowTopBar.propTypes = {
  allowClose: PropTypes.bool,
  allowMaximize: PropTypes.bool,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  focused: PropTypes.bool,
  manifestTitle: PropTypes.string,
  maximized: PropTypes.bool,
  maximizeWindow: PropTypes.func,
  minimizeWindow: PropTypes.func,
  removeWindow: PropTypes.func.isRequired,
  t: PropTypes.func,
  toggleWindowSideBar: PropTypes.func.isRequired,
  windowDraggable: PropTypes.bool,
  windowId: PropTypes.string.isRequired,
};

WindowTopBar.defaultProps = {
  allowClose: true,
  allowMaximize: true,
  focused: false,
  manifestTitle: '',
  maximized: false,
  maximizeWindow: () => {},
  minimizeWindow: () => {},
  t: key => key,
  windowDraggable: true,
};
