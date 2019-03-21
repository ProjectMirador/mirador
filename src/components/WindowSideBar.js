import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
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
          classes={{ paper: classNames(classes.paper) }}
          anchor="left"
          PaperProps={{ component: 'nav', style: { position: 'relative' } }}
          SlideProps={{ mountOnEnter: true, unmountOnExit: true }}
          open={sideBarOpen}
        >
          <WindowSideBarButtons windowId={windowId} />
        </Drawer>
      </>
    );
  }
}

WindowSideBar.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types,
  sideBarOpen: PropTypes.bool,
  windowId: PropTypes.string.isRequired,
};

WindowSideBar.defaultProps = {
  sideBarOpen: false,
};
