import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/CloseSharp';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import ns from '../config/css-ns';

/** */
export class MinimalWindow extends Component {
  /** */
  render() {
    const {
      allowClose,
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
          cn(classes.window, ns('window'))}
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
            {allowClose && (
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
  children: PropTypes.node,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  label: PropTypes.string,
  removeWindow: PropTypes.func.isRequired,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

MinimalWindow.defaultProps = {
  allowClose: true,
  children: null,
  label: '',
  t: key => key,
};
