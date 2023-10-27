import { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@mui/material/Drawer';
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
      classes, direction, t, windowId, sideBarOpen,
    } = this.props;

    return (
      <Drawer
        variant="persistent"
        className={classes.drawer}
        sx={theme => ({
          flexShrink: 0,
          height: '100%',
          order: -1000,
          zIndex: theme.zIndex.appBar - 1,
        })}
        anchor={direction === 'rtl' ? 'right' : 'left'}
        PaperProps={{
          'aria-label': t('sidebarPanelsNavigation'),
          component: 'nav',
          sx: {
            borderInlineEnd: '1px solid',
            borderInlineEndColor: 'divider',
            height: '100%',
            overflowX: 'hidden',
            position: 'relative',
            width: 48,
          },
        }}
        SlideProps={{ direction: direction === 'rtl' ? 'left' : 'right', mountOnEnter: true, unmountOnExit: true }}
        open={sideBarOpen}
      >
        <WindowSideBarButtons windowId={windowId} />
      </Drawer>
    );
  }
}

WindowSideBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  direction: PropTypes.string.isRequired,
  sideBarOpen: PropTypes.bool,
  t: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

WindowSideBar.defaultProps = {
  classes: {},
  sideBarOpen: false,
};
