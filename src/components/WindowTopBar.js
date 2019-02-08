import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
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
   * titleContent
   *
   * @return {String}
   */
  titleContent() {
    const { manifest } = this.props;
    if (manifest && manifest.manifestation) {
      return manifest.manifestation.getLabel().map(label => label.value)[0];
    }
    return '';
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      removeWindow, windowId, classes, toggleWindowSideBar, t,
    } = this.props;
    return (
      <Toolbar disableGutters className={classNames(classes.reallyDense, ns('window-top-bar'))} variant="dense">
        <IconButton
          aria-label={t('toggleWindowSideBar')}
          color="inherit"
          onClick={() => toggleWindowSideBar(windowId)}
        >
          <MenuIcon />
        </IconButton>
        <WindowIcon windowId={windowId} />
        <Typography variant="h3" noWrap color="inherit" className={classes.typographyBody}>
          {this.titleContent()}
        </Typography>
        <WindowTopBarButtons windowId={windowId} />
        <WindowTopMenuButton className={ns('window-menu-btn')} windowId={windowId} />
        <Button color="inherit" className={ns('window-close')} aria-label={t('closeWindow')} onClick={removeWindow}>&times;</Button>
      </Toolbar>
    );
  }
}

WindowTopBar.propTypes = {
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  removeWindow: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  toggleWindowSideBar: PropTypes.func,
  t: PropTypes.func,
};

WindowTopBar.defaultProps = {
  manifest: null,
  toggleWindowSideBar: () => {},
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
