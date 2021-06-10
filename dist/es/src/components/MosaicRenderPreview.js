import React from 'react';
import MinimalWindow from '../containers/MinimalWindow';
/**
 * MosaicRenderPreview is used to for the preview when dragging a mosaic window/tile
*/

export function MosaicRenderPreview(props) {
  var t = props.t,
      title = props.title,
      windowId = props.windowId;
  return /*#__PURE__*/React.createElement(MinimalWindow, {
    windowId: "".concat(windowId, "-preview"),
    label: t('previewWindowTitle', {
      title: title
    }),
    ariaLabel: false
  });
}
MosaicRenderPreview.defaultProps = {
  t: function t(k) {
    return k;
  },
  title: ''
};