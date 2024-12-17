import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import CompanionWindow from '../containers/CompanionWindow';
import CanvasLayers from '../containers/CanvasLayers';

/**
 * a panel showing the canvases for a given manifest
 */
export function LayersPanel({
  canvasIds = [], id,
}) {
  const { t } = useTranslation();
  return (
    <CompanionWindow
      title={t('layers')}
      id={id}
    >
      {canvasIds.map((canvasId, index) => (
        <CanvasLayers
          canvasId={canvasId}
          index={index}
          key={canvasId}
          totalSize={canvasIds.length}
        />
      ))}
    </CompanionWindow>
  );
}

LayersPanel.propTypes = {
  canvasIds: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string.isRequired,
};
