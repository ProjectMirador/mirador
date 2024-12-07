import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import WindowSideBarButtons from '../containers/WindowSideBarButtons';

const Root = styled(Drawer, { name: 'WindowSideBar', slot: 'root' })(({ theme }) => ({
  flexShrink: 0,
  order: -1000,
  zIndex: theme.zIndex.appBar - 1,
}));

const Nav = styled('nav', { name: 'WindowSideBar', slot: 'nav' })({
  position: 'relative !important',
  width: 48,
});

/**
 * WindowSideBar
 */
export function WindowSideBar({
  classes = {}, direction, t, windowId, sideBarOpen = false,
}) {
  return (
    <Root
      variant="persistent"
      className={classes.drawer}
      anchor={direction === 'rtl' ? 'right' : 'left'}
      PaperProps={{
        'aria-label': t('sidebarPanelsNavigation'),
        component: Nav,
        variant: 'outlined',
      }}
      SlideProps={{ direction: direction === 'rtl' ? 'left' : 'right', mountOnEnter: true, unmountOnExit: true }}
      open={sideBarOpen}
    >
      <WindowSideBarButtons windowId={windowId} />
    </Root>
  );
}

WindowSideBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  direction: PropTypes.string.isRequired,
  sideBarOpen: PropTypes.bool,
  t: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};
