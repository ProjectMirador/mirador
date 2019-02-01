import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import WindowSideBarButtons from '../containers/WindowSideBarButtons';

/**
 * WindowSideBar
 */
class WindowSideBar extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      windowId, classes, sideBarOpen,
    } = this.props;

    return (
      <Drawer
        variant="temporary"
        className={classNames(classes.drawer)}
        classes={{ paper: classNames(classes.drawer) }}
        open={sideBarOpen}
        anchor="left"
        PaperProps={{ style: { position: 'relative' } }}
        ModalProps={{
          container: document.getElementById(windowId),
          disablePortal: true,
          hideBackdrop: true,
          style: { position: 'absolute' },
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <WindowSideBarButtons windowId={windowId} />
        </List>
      </Drawer>
    );
  }
}


WindowSideBar.propTypes = {
  windowId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types,
  sideBarOpen: PropTypes.bool,
};

WindowSideBar.defaultProps = {
  sideBarOpen: false,
};

/**
 Material UI style overrides
 @private
 */
const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  drawer: {
    overflowX: 'hidden',
    left: 0,
    width: 55,
    flexShrink: 0,
    height: '100%',
  },
  grow: {
    flexGrow: 1,
  },
});

export default withStyles(styles)(WindowSideBar);
