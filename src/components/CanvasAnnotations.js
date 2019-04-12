import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { SanitizedHtml } from './SanitizedHtml';

/**
 * CanvasAnnotations ~
*/
export class CanvasAnnotations extends Component {
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
   * Returns the rendered component
  */
  render() {
    const {
      annotations, classes, index, label, selectedAnnotationIds, t, totalSize,
    } = this.props;
    if (annotations.length === 0) return <></>;

    return (
      <>
        <Typography className={classes.sectionHeading} variant="overline">
          {t('annotationCanvasLabel', { context: `${index + 1}/${totalSize}`, label })}
        </Typography>
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
      </>
    );
  }
}

CanvasAnnotations.propTypes = {
  allAnnotationsAreHighlighted: PropTypes.bool.isRequired,
  annotations: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ),
  classes: PropTypes.objectOf(PropTypes.string),
  deselectAnnotation: PropTypes.func.isRequired,
  highlightAnnotation: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  selectAnnotation: PropTypes.func.isRequired,
  selectedAnnotationIds: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func.isRequired,
  totalSize: PropTypes.number.isRequired,
  windowId: PropTypes.string.isRequired,
};
CanvasAnnotations.defaultProps = {
  annotations: [],
  classes: {},
  selectedAnnotationIds: [],
};
