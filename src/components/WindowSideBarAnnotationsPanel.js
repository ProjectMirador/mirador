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
      annotationCount, classes, canvasIds, t, windowId, id,
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

        {canvasIds.map((canvasId, index) => (
          <CanvasAnnotations
            canvasId={canvasId}
            key={canvasId}
            index={index}
            totalSize={canvasIds.length}
            windowId={windowId}
          />
        ))}
      </CompanionWindow>
    );
  }
}

WindowSideBarAnnotationsPanel.propTypes = {
  annotationCount: PropTypes.number.isRequired,
  canvasIds: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

WindowSideBarAnnotationsPanel.defaultProps = {
  canvasIds: [],
  t: key => key,
};
