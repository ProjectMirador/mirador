import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CompanionWindow from '../containers/CompanionWindow';
import CanvasLayers from '../containers/CanvasLayers';

/**
 * a panel showing the canvases for a given manifest
 */
export class LayersPanel extends Component {
  /**
   * render
   */
  render() {
    const {
      canvases,
      id,
      t,
      windowId,
    } = this.props;

    return (
      <CompanionWindow
        title={t('layers')}
        id={id}
        windowId={windowId}
      >
        {canvases.map((canvas, index) => (
          <CanvasLayers
            canvasId={canvas.id}
            index={index}
            key={canvas.id}
            totalSize={canvases.length}
            windowId={windowId}
          />
        ))}
      </CompanionWindow>
    );
  }
}

LayersPanel.propTypes = {
  canvases: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })),
  id: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

LayersPanel.defaultProps = {
  canvases: [],
};
