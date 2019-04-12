import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import AnnotationSettings from '../containers/AnnotationSettings';
import CanvasAnnotations from '../containers/CanvasAnnotations';
import CompanionWindow from '../containers/CompanionWindow';
import ns from '../config/css-ns';

/**
 * WindowSideBarAnnotationsPanel ~
*/
export class WindowSideBarAnnotationsPanel extends Component {
  /**
   * Returns the rendered component
  */
  render() {
    const {
      annotationCount, classes, selectedCanvases, t, windowId, id,
    } = this.props;
    return (
      <CompanionWindow
        title={t('annotations')}
        paperClassName={ns('window-sidebar-annotation-panel')}
        windowId={windowId}
        id={id}
        titleControls={<AnnotationSettings windowId={windowId} />}
      >
        <div className={classes.section}>
          <Typography component="p" variant="subtitle2">{t('showingNumAnnotations', { number: annotationCount })}</Typography>
        </div>

        {selectedCanvases.map((canvas, index) => (
          <CanvasAnnotations
            canvasId={canvas.id}
            canvasIndex={canvas.index}
            key={canvas.id}
            index={index}
            totalSize={selectedCanvases.length}
            windowId={windowId}
          />
        ))}
      </CompanionWindow>
    );
  }
}

WindowSideBarAnnotationsPanel.propTypes = {
  annotationCount: PropTypes.number.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,

  id: PropTypes.string.isRequired,
  selectedCanvases: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

WindowSideBarAnnotationsPanel.defaultProps = {
  selectedCanvases: [],
  t: key => key,
};
