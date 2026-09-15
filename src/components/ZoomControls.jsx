import AddCircleIcon from '@mui/icons-material/AddCircleOutlineSharp';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import RestoreZoomIcon from './icons/RestoreZoomIcon';
import MiradorMenuButton from '../containers/MiradorMenuButton';

const StyledZoomControlsWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});

/**
 */
export function ZoomControls({ windowId = '', updateViewport = () => {}, viewer = {}, zoomToWorld }) {
  const { t } = useTranslation();
  // viewers[windowId] in Redux is null until the camera's own position has
  // been reported at least once (e.g. before an image has finished
  // settling) -- a real, expected state, not an edge case -- so
  // `viewer = {}` (which only guards a missing prop, not an explicit null)
  // isn't enough on its own.
  const { zoom = 1 } = viewer || {};

  /** */
  const handleZoomInClick = () => {
    updateViewport(windowId, {
      zoom: zoom * 2,
    });
  };

  /** */
  const handleZoomOutClick = () => {
    updateViewport(windowId, {
      zoom: zoom / 2,
    });
  };

  return (
    <StyledZoomControlsWrapper>
      <MiradorMenuButton aria-label={t('zoomIn')} onClick={handleZoomInClick}>
        <AddCircleIcon />
      </MiradorMenuButton>
      <MiradorMenuButton aria-label={t('zoomOut')} onClick={handleZoomOutClick}>
        <RemoveCircleIcon />
      </MiradorMenuButton>
      <MiradorMenuButton aria-label={t('zoomReset')} onClick={() => zoomToWorld(false)}>
        <RestoreZoomIcon />
      </MiradorMenuButton>
    </StyledZoomControlsWrapper>
  );
}

ZoomControls.propTypes = {
  updateViewport: PropTypes.func,
  viewer: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    zoom: PropTypes.number,
  }),
  windowId: PropTypes.string,
  zoomToWorld: PropTypes.func.isRequired,
};
