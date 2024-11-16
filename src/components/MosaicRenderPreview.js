import PropTypes from 'prop-types';
import MinimalWindow from '../containers/MinimalWindow';

/**
 * MosaicRenderPreview is used for the preview when dragging a mosaic window/tile
 */
export function MosaicRenderPreview({
  t = k => k,
  title = '',
  windowId,
}) {
  return (
    <MinimalWindow
      windowId={`${windowId}-preview`}
      label={t('previewWindowTitle', { title })}
      ariaLabel={false}
    />
  );
}

MosaicRenderPreview.propTypes = {
  t: PropTypes.func,
  title: PropTypes.string,
  windowId: PropTypes.string.isRequired,
};
