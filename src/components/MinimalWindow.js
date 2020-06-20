import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/MenuSharp';
import cn from 'classnames';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/CloseSharp';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import ns from '../config/css-ns';

/** */
export class MinimalWindow extends Component {
  /** */
  render() {
    const {
      allowClose,
      allowWindowSideBar,
      children,
      classes,
      label,
      removeWindow,
      t,
      windowId,
    } = this.props;

    return (
      <Paper
        component="section"
        elevation={1}
        id={windowId}
        className={
          cn(classes.window, ns('placeholder-window'))}
        aria-label={t('window', { label })}
      >
        <AppBar position="relative" color="default">
          <Toolbar
            disableGutters
            className={cn(
              classes.windowTopBarStyle,
              ns('window-top-bar'),
            )}
            variant="dense"
          >
            {allowWindowSideBar && (
              <MiradorMenuButton
                aria-label={t('toggleWindowSideBar')}
                disabled
              >
                <MenuIcon />
              </MiradorMenuButton>
            )}
            <Typography variant="h2" noWrap color="inherit" className={classes.title}>
              {label}
            </Typography>
            {allowClose && removeWindow && (
              <MiradorMenuButton
                aria-label={t('closeWindow')}
                className={cn(classes.button, ns('window-close'))}
                onClick={removeWindow}
              >
                <CloseIcon />
              </MiradorMenuButton>
            )}
          </Toolbar>
        </AppBar>
        {children}
      </Paper>
    );
  }
}

MinimalWindow.propTypes = {
  allowClose: PropTypes.bool,
  allowWindowSideBar: PropTypes.bool,
  children: PropTypes.node,
  classes: PropTypes.objectOf(PropTypes.string),
  label: PropTypes.string,
  removeWindow: PropTypes.func,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

MinimalWindow.defaultProps = {
  allowClose: true,
  allowWindowSideBar: true,
  children: null,
  classes: {},
  label: '',
  removeWindow: () => {},
  t: key => key,
};
