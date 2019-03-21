import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { SanitizedHtml } from './SanitizedHtml';
import AnnotationSettings from '../containers/AnnotationSettings';
import CompanionWindow from '../containers/CompanionWindow';
import ns from '../config/css-ns';

/**
 * WindowSideBarAnnotationsPanel ~
*/
export class WindowSideBarAnnotationsPanel extends Component {
  /**
   * Rreturn an array of sanitized annotation data
   */
  sanitizedAnnotations() {
    const {
      annotations,
      classes,
      deselectAnnotation,
      windowId,
      selectAnnotation,
      selectedAnnotationIds,
    } = this.props;

    return (
      <List>
        {
          annotations.map(annotation => (
            <ListItem
              key={annotation.id}
              className={
                selectedAnnotationIds.includes(annotation.id)
                  ? classes.selectedAnnotation
                  : null
              }
              onClick={() => {
                if (selectedAnnotationIds.includes(annotation.id)) {
                  deselectAnnotation(windowId, annotation.targetId, annotation.id);
                } else {
                  selectAnnotation(windowId, annotation.targetId, annotation.id);
                }
              }}
            >
              <Typography variant="body2">
                <SanitizedHtml ruleSet="iiif" htmlString={annotation.content} />
              </Typography>
            </ListItem>
          ))
        }
      </List>
    );
  }

  /**
   * Returns the rendered component
  */
  render() {
    const {
      annotations, classes, t, windowId, id,
    } = this.props;
    return (
      <CompanionWindow title={t('annotations')} paperClassName={ns('window-sidebar-annotation-panel')} windowId={windowId} id={id}>
        <AnnotationSettings windowId={windowId} />
        <div className={classes.section}>
          <Typography variant="subtitle2">{t('showingNumAnnotations', { number: annotations.length })}</Typography>
        </div>
        {this.sanitizedAnnotations()}
      </CompanionWindow>
    );
  }
}

WindowSideBarAnnotationsPanel.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })),
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  deselectAnnotation: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  selectAnnotation: PropTypes.func.isRequired,
  selectedAnnotationIds: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

WindowSideBarAnnotationsPanel.defaultProps = {
  annotations: [],
  selectedAnnotationIds: [],
  t: key => key,
};
