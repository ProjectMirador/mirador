import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import AnnotationSettings from '../containers/AnnotationSettings';
import CanvasAnnotations from '../containers/CanvasAnnotations';
import CompanionWindow from '../containers/CompanionWindow';
import { CompanionWindowSection } from './CompanionWindowSection';
import ns from '../config/css-ns';

/**
 * WindowSideBarAnnotationsPanel ~
*/
function WindowSideBarAnnotationsPanel({
  annotationCount, canvasIds, t, windowId, id,
}) {
  /** */
  const containerRef = useRef();
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    console.log(`Use effect ${containerRef}`);
    console.log(`Use effect current ${containerRef.current}`);
  });

  return (
    <CompanionWindow
      title={t('annotations')}
      paperClassName={ns('window-sidebar-annotation-panel')}
      windowId={windowId}
      className="mirador-annotations-panel"
      id={id}
      ref={containerRef}
      titleControls={<AnnotationSettings windowId={windowId} />}
    >
      <CompanionWindowSection>
        <Typography component="p" variant="subtitle2">{t('showingNumAnnotations', { count: annotationCount, number: annotationCount })}</Typography>
      </CompanionWindowSection>

      {canvasIds.map((canvasId, index) => (
        <CanvasAnnotations
          canvasId={canvasId}
          containerRef={containerRef}
          key={canvasId}
          index={index}
          totalSize={canvasIds.length}
          windowId={windowId}

        />
      ))}
    </CompanionWindow>
  );
}

WindowSideBarAnnotationsPanel.propTypes = {
  annotationCount: PropTypes.number.isRequired,
  canvasIds: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string.isRequired,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

WindowSideBarAnnotationsPanel.defaultProps = {
  canvasIds: [],
  t: key => key,
};

export default WindowSideBarAnnotationsPanel;
