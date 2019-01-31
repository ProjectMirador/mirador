import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ConnectedWindowSideBarButtons from './WindowSideBarButtons';
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
      windowId, classes, sideBarOpen,
    } = this.props;

    return (
      <div className={ns(['window-sidebar', (sideBarOpen ? 'window-sidebar-open' : 'window-sidebar-closed')])}>
        <div className={classes.toolbar} />
        <List>
          <ConnectedWindowSideBarButtons windowId={windowId} />
        </List>
      </div>
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
});

export default withStyles(styles)(WindowSideBar);
