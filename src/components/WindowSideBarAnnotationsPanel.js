import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
   * constructor -
   */
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  /**
   * Handle click event of an annotation.
  */
  handleClick(event, annotation) {
    const {
      deselectAnnotation, selectAnnotation, selectedAnnotationIds, windowId,
    } = this.props;

    if (selectedAnnotationIds.includes(annotation.id)) {
      deselectAnnotation(windowId, annotation.targetId, annotation.id);
    } else {
      selectAnnotation(windowId, annotation.targetId, annotation.id);
    }
  }

  /** */
  handleMouseEnter(annotation) {
    const { allAnnotationsAreHighlighted, highlightAnnotation, windowId } = this.props;
    if (allAnnotationsAreHighlighted) return;

    highlightAnnotation(windowId, annotation.id);
  }

  /** */
  handleMouseLeave() {
    const { allAnnotationsAreHighlighted, highlightAnnotation, windowId } = this.props;
    if (allAnnotationsAreHighlighted) return;

    highlightAnnotation(windowId, null);
  }

  /**
   * Rreturn an array of sanitized annotation data
   */
  sanitizedAnnotations() {
    const {
      annotations,
      classes,
      selectedAnnotationIds,
    } = this.props;

    return (
      <List>
        {
          annotations.map(annotation => (
            <ListItem
              className={classes.annotationListItem}
              key={annotation.id}
              selected={selectedAnnotationIds.includes(annotation.id)}
              onClick={e => this.handleClick(e, annotation)}
              onMouseEnter={() => this.handleMouseEnter(annotation)}
              onMouseLeave={() => this.handleMouseLeave(annotation)}
            >
              <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                <SanitizedHtml ruleSet="iiif" htmlString={annotation.content} />
              </ListItemText>
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
      <CompanionWindow
        title={t('annotations')}
        paperClassName={ns('window-sidebar-annotation-panel')}
        windowId={windowId}
        id={id}
        titleControls={<AnnotationSettings windowId={windowId} />}
      >
        <div className={classes.section}>
          <Typography component="p" variant="subtitle2">{t('showingNumAnnotations', { number: annotations.length })}</Typography>
        </div>
        {this.sanitizedAnnotations()}
      </CompanionWindow>
    );
  }
}

WindowSideBarAnnotationsPanel.propTypes = {
  allAnnotationsAreHighlighted: PropTypes.bool.isRequired,
  annotations: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })),
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  deselectAnnotation: PropTypes.func.isRequired,
  highlightAnnotation: PropTypes.func.isRequired,
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
