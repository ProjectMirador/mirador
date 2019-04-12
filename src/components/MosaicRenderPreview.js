import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * MosaicRenderPreview is used to for the preview when dragging a mosaic window/tile
*/
export function MosaicRenderPreview(props) {
  const {
    classes, t, title,
  } = props;

  return (
    <div className={classNames('mosaic-window-body', classes.preview)}>
      {t('previewWindowTitle', { title })}
    </div>
  );
}

MosaicRenderPreview.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  t: PropTypes.func,
  title: PropTypes.string,
  windowId: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
};

MosaicRenderPreview.defaultProps = {
  classes: {},
  t: k => k,
  title: '',
};
