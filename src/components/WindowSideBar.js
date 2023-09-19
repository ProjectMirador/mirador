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
      direction, t, windowId, sideBarOpen,
    } = this.props;

    return (
      <Drawer
        variant="persistent"
        sx={{
          flexShrink: 0,
          height: '100%',
          order: -1000,
          zIndex: 'appBar' - 1,
        }}
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
  direction: PropTypes.string.isRequired,
  sideBarOpen: PropTypes.bool,
  t: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

WindowSideBar.defaultProps = {
  sideBarOpen: false,
};
