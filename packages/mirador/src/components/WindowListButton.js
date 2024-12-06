import { useState } from 'react';
import PropTypes from 'prop-types';
import BookmarksIcon from '@mui/icons-material/BookmarksSharp';
import WindowList from '../containers/WindowList';
import MiradorMenuButton from '../containers/MiradorMenuButton';

/**
 * WindowListButton ~
*/
export function WindowListButton({ disabled = false, t, windowCount }) {
  const [windowListAnchor, setWindowListAnchor] = useState(null);

  /** */
  const handleClose = () => { setWindowListAnchor(null); };
  /** */
  const handleOpen = (event) => { setWindowListAnchor(event.currentTarget); };

  return (
    <>
      <MiradorMenuButton
        aria-haspopup="true"
        aria-label={t('listAllOpenWindows')}
        aria-owns={windowListAnchor ? 'window-list' : null}
        selected={Boolean(windowListAnchor)}
        disabled={disabled}
        badge
        BadgeProps={{
          badgeContent: windowCount,
          sx: {
            '.MuiBadge-badge': {
              paddingLeft: 1.5,
            },
          },
        }}
        onClick={(e) => handleOpen(e)}
      >
        <BookmarksIcon />
      </MiradorMenuButton>

      {Boolean(windowListAnchor) && (
      <WindowList
        anchorEl={windowListAnchor}
        id="window-list"
        open={Boolean(windowListAnchor)}
        handleClose={handleClose}
      />
      )}
    </>
  );
}

WindowListButton.propTypes = {
  disabled: PropTypes.bool,
  t: PropTypes.func.isRequired,
  windowCount: PropTypes.number.isRequired,
};
