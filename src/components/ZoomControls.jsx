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
export function ZoomControls({ windowId = '', updateViewport = () => {}, viewer = {}, zoomToWorld, getZoomBounds = () => ({}) }) {
  const { t } = useTranslation();
  const { zoom: liveZoom, minZoom, maxZoom } = getZoomBounds();
  // Fall back to the redux-tracked zoom if the viewport isn't available yet.
  // viewer can be explicitly null (not just absent), which the default
  // parameter above doesn't catch.
  const currentZoom = liveZoom ?? viewer?.zoom;

  /** */
  const handleZoomInClick = () => {
    const nextZoom = currentZoom * 2;
    updateViewport(windowId, {
      zoom: maxZoom == null ? nextZoom : Math.min(nextZoom, maxZoom),
    });
  };

  /** */
  const handleZoomOutClick = () => {
    const nextZoom = currentZoom / 2;
    updateViewport(windowId, {
      zoom: minZoom == null ? nextZoom : Math.max(nextZoom, minZoom),
    });
  };

  return (
    <StyledZoomControlsWrapper>
      <MiradorMenuButton
        aria-label={t('zoomIn')}
        onClick={handleZoomInClick}
        disabled={maxZoom != null && currentZoom >= maxZoom}
      >
        <AddCircleIcon />
      </MiradorMenuButton>
      <MiradorMenuButton
        aria-label={t('zoomOut')}
        onClick={handleZoomOutClick}
        disabled={minZoom != null && currentZoom <= minZoom}
      >
        <RemoveCircleIcon />
      </MiradorMenuButton>
      <MiradorMenuButton aria-label={t('zoomReset')} onClick={() => zoomToWorld(false)}>
        <RestoreZoomIcon />
      </MiradorMenuButton>
    </StyledZoomControlsWrapper>
  );
}

ZoomControls.propTypes = {
  getZoomBounds: PropTypes.func,
  updateViewport: PropTypes.func,
  viewer: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    zoom: PropTypes.number,
  }),
  windowId: PropTypes.string,
  zoomToWorld: PropTypes.func.isRequired,
};
