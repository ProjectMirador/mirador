import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import WindowSideBarButtons from '../containers/WindowSideBarButtons';

/**
 * WindowSideBar
 */
export class WindowSideBar extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      classes, windowId, sideBarOpen,
    } = this.props;

    return (
      <>
        <Drawer
          variant="persistent"
          className={classNames(classes.drawer)}
          classes={{ paper: classNames(classes.drawer) }}
          anchor="left"
          PaperProps={{ style: { position: 'relative' } }}
          component="aside"
          open={sideBarOpen}
        >
          <List>
            <WindowSideBarButtons windowId={windowId} />
          </List>
        </Drawer>
      </>
    );
  }
}

WindowSideBar.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types,
  windowId: PropTypes.string.isRequired,
  sideBarOpen: PropTypes.bool,
};

WindowSideBar.defaultProps = {
  sideBarOpen: false,
};
