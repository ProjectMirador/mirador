import { Component } from 'react';
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
      canvasIds,
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
        {canvasIds.map((canvasId, index) => (
          <CanvasLayers
            canvasId={canvasId}
            index={index}
            key={canvasId}
            totalSize={canvasIds.length}
            windowId={windowId}
          />
        ))}
      </CompanionWindow>
    );
  }
}

LayersPanel.propTypes = {
  canvasIds: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

LayersPanel.defaultProps = {
  canvasIds: [],
};
