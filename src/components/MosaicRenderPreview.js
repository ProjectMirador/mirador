import React from 'react';
import PropTypes from 'prop-types';
import MinimalWindow from '../containers/MinimalWindow';

/**
 * MosaicRenderPreview is used to for the preview when dragging a mosaic window/tile
*/
export function MosaicRenderPreview(props) {
  const {
    t, title, windowId,
  } = props;

  return (
    <MinimalWindow windowId={`${windowId}-preview`} label={t('previewWindowTitle', { title })} />
  );
}

MosaicRenderPreview.propTypes = {
  t: PropTypes.func,
  title: PropTypes.string,
  windowId: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
};

MosaicRenderPreview.defaultProps = {
  t: k => k,
  title: '',
};
