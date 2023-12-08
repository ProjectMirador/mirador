import { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import WindowSideBarButtons from '../containers/WindowSideBarButtons';

const Root = styled(Drawer, { name: 'WindowSideBar', slot: 'root' })(({ theme }) => ({
  flexShrink: 0,
  height: '100%',
  order: -1000,
  zIndex: theme.zIndex.appBar - 1,
}));

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
      <Root
        variant="persistent"
        className={classes.drawer}
        anchor={direction === 'rtl' ? 'right' : 'left'}
        PaperProps={{
          'aria-label': t('sidebarPanelsNavigation'),
          component: 'nav',
          sx: {
            borderBlock: 0,
            borderInlineStart: 0,
            height: '100%',
            overflowX: 'hidden',
            position: 'relative',
            width: 48,
          },
          variant: 'outlined',
        }}
        SlideProps={{ direction: direction === 'rtl' ? 'left' : 'right', mountOnEnter: true, unmountOnExit: true }}
        open={sideBarOpen}
      >
        <WindowSideBarButtons windowId={windowId} />
      </Root>
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
