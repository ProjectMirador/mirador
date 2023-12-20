import { Component } from 'react';
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
      classes, direction, t, sideBarOpen,
    } = this.props;

    return (
      <Drawer
        variant="persistent"
        className={classNames(classes.drawer)}
        classes={{ paper: classNames(classes.paper) }}
        anchor={direction === 'rtl' ? 'right' : 'left'}
        PaperProps={{
          'aria-label': t('sidebarPanelsNavigation'),
          component: 'nav',
          style: { height: '100%', position: 'relative' },
        }}
        SlideProps={{ direction: direction === 'rtl' ? 'left' : 'right', mountOnEnter: true, unmountOnExit: true }}
        open={sideBarOpen}
      >
        <WindowSideBarButtons />
      </Drawer>
    );
  }
}

WindowSideBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  direction: PropTypes.string.isRequired,
  sideBarOpen: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

WindowSideBar.defaultProps = {
  sideBarOpen: false,
};
