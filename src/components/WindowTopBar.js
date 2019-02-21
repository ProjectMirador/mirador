import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import classNames from 'classnames';
import WindowIcon from '../containers/WindowIcon';
import WindowTopMenuButton from '../containers/WindowTopMenuButton';
import WindowTopBarButtons from '../containers/WindowTopBarButtons';
import ns from '../config/css-ns';


/**
 * WindowTopBar
 */
class WindowTopBar extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      closeWindow, windowId, classes, toggleWindowSideBar, t, manifestTitle,
    } = this.props;
    return (
      <AppBar position="relative">
        <Toolbar disableGutters className={classNames(classes.reallyDense, ns('window-top-bar'))} variant="dense">
          <IconButton
            aria-label={t('toggleWindowSideBar')}
            color="inherit"
            onClick={toggleWindowSideBar}
          >
            <MenuIcon />
          </IconButton>
          <WindowIcon windowId={windowId} />
          <Typography variant="h3" noWrap color="inherit" className={classes.typographyBody}>
            {manifestTitle}
          </Typography>
          <WindowTopBarButtons windowId={windowId} />
          <WindowTopMenuButton className={ns('window-menu-btn')} windowId={windowId} />
          <IconButton
            color="inherit"
            className={ns('window-close')}
            aria-label={t('closeWindow')}
            onClick={closeWindow}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

WindowTopBar.propTypes = {
  manifestTitle: PropTypes.string,
  closeWindow: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  toggleWindowSideBar: PropTypes.func.isRequired,
  t: PropTypes.func,
};

WindowTopBar.defaultProps = {
  manifestTitle: '',
  t: key => key,
};

const styles = {
  typographyBody: {
    flexGrow: 1,
    fontSize: '1em',
  },
  reallyDense: {
    minHeight: 32,
    paddingLeft: 4,
  },
};

export default withStyles(styles)(WindowTopBar);
