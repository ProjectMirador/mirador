import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import WindowSideBarButtons from '../containers/WindowSideBarButtons';
import WindowSideBarPanel from '../containers/WindowSideBarPanel';
import ns from '../config/css-ns';

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
      classes, windowId, sideBarOpen, sideBarPanel,
    } = this.props;

    return (
      <>
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
          <List>
            <WindowSideBarButtons windowId={windowId} />
          </List>
        </Drawer>
        <Drawer
          variant="temporary"
          className={classNames(classes.drawer, ns('window-sidebar-panel-drawer'))}
          classes={{ paper: classNames(classes.drawer) }}
          open={sideBarOpen && sideBarPanel !== 'closed'}
          anchor="left"
          PaperProps={{ style: { position: 'relative', width: '200px' } }}
          ModalProps={{
            container: document.getElementById(windowId),
            disablePortal: true,
            hideBackdrop: true,
            style: { position: 'absolute', width: '200px' },
          }}
        >
          <WindowSideBarPanel windowId={windowId} />
        </Drawer>
      </>
    );
  }
}

WindowSideBar.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types,
  windowId: PropTypes.string.isRequired,
  sideBarOpen: PropTypes.bool,
  sideBarPanel: PropTypes.string,
};

WindowSideBar.defaultProps = {
  sideBarOpen: false,
  sideBarPanel: 'closed',
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
