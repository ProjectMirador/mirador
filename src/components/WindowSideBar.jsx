import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import WindowSideBarButtons from '../containers/WindowSideBarButtons';

const Root = styled(Drawer, { name: 'WindowSideBar', slot: 'root' })(({ theme }) => ({
  flexShrink: 0,
  order: -1000,
  zIndex: theme.zIndex.appBar - 1,
}));

/**
 * WindowSideBar
 */
export function WindowSideBar({ classes = {}, direction, windowId, sideBarOpen = false }) {
  const { t } = useTranslation();
  return (
    <Drawer
      sx={{ flexShrink: 0, order: -1000, zIndex: (theme) => theme.zIndex.appBar - 1 }}
      variant="persistent"
      className={classes.drawer}
      anchor={direction === 'rtl' ? 'right' : 'left'}
      slotProps={{
        paper: {
          component: 'nav',
          sx: { width: sideBarOpen ? 48 : 0, position: 'relative' },
        },
        slide: {
          direction: direction === 'rtl' ? 'left' : 'right',
          mountOnEnter: true,
          unmountOnExit: true,
        },
      }}
      open={sideBarOpen}
    >
      <WindowSideBarButtons windowId={windowId} />
    </Drawer>
  );
}

WindowSideBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  direction: PropTypes.string.isRequired,
  sideBarOpen: PropTypes.bool,
  windowId: PropTypes.string.isRequired,
};
