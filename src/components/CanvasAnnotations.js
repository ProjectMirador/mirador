import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Chip from '@material-ui/core/Chip';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import SanitizedHtml from '../containers/SanitizedHtml';

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
    this.handleAnnotationHover = this.handleAnnotationHover.bind(this);
    this.handleAnnotationBlur = this.handleAnnotationBlur.bind(this);
  }

  /**
   * Handle click event of an annotation.
  */
  handleClick(event, annotation) {
    const {
      deselectAnnotation, selectAnnotation, selectedAnnotationId, windowId,
    } = this.props;

    if (selectedAnnotationId === annotation.id) {
      deselectAnnotation(windowId, annotation.id);
    } else {
      selectAnnotation(windowId, annotation.id);
    }
  }

  /** */
  handleAnnotationHover(annotation) {
    const { hoverAnnotation, windowId } = this.props;

    hoverAnnotation(windowId, [annotation.id]);
  }

  /** */
  handleAnnotationBlur() {
    const { hoverAnnotation, windowId } = this.props;

    hoverAnnotation(windowId, []);
  }

  /** */
  getFullAnnotation(id) {
    const {
      fullAnnotations,
    } = this.props;
    let annotation;
    for (let i = 0; i < fullAnnotations.length; i += 1) {
      annotation = fullAnnotations[i].resources.find(anno => anno.id === id);
      if (annotation) {
        break;
      }
    }
    return annotation;
  }

  /**
   * Returns the rendered component
  */
  render() {
    const {
      annotations, classes, index, label, selectedAnnotationId, t, totalSize,
      listContainerComponent, htmlSanitizationRuleSet, hoveredAnnotationIds,
    } = this.props;
    if (annotations.length === 0) return <></>;

    return (
      <>
        <Typography className={classes.sectionHeading} variant="overline">
          {t('annotationCanvasLabel', { context: `${index + 1}/${totalSize}`, label })}
        </Typography>
        <MenuList autoFocusItem variant="selectedMenu">
          {
            annotations.map(annotation => {
              const fullAnnotation = this.getFullAnnotation(annotation.id);
              const width = (fullAnnotation.body && fullAnnotation.body[0].imgWidth < 60) ? (fullAnnotation.body[0].imgWidth).toString() : '60';
              const height = (fullAnnotation.body && fullAnnotation.body[0].imageHeight < 60) ? (fullAnnotation.body[0].imageHeight).toString() : '60';
              return (
                <MenuItem
                  button
                  component={listContainerComponent}
                  className={clsx(
                    classes.annotationListItem,
                    {
                      [classes.hovered]: hoveredAnnotationIds.includes(annotation.id),
                    },
                  )}
                  key={annotation.id}
                  annotationid={annotation.id}
                  selected={selectedAnnotationId === annotation.id}
                  onClick={e => this.handleClick(e, annotation)}
                  onFocus={() => this.handleAnnotationHover(annotation)}
                  onBlur={this.handleAnnotationBlur}
                  onMouseEnter={() => this.handleAnnotationHover(annotation)}
                  onMouseLeave={this.handleAnnotationBlur}
                >
                  {fullAnnotation.body && fullAnnotation.body[0] && fullAnnotation.body[0] && fullAnnotation.body[0].type === 'ImageBody' && fullAnnotation.body[0].type.toLowerCase().includes('image') && fullAnnotation.body[0].url && (<img src={fullAnnotation.body[0].url} alt="Single Annotation" width={width} height={height} style={{ marginRight: '5%', minWidth: { width } }} />)}
                  <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                    <SanitizedHtml
                      ruleSet={htmlSanitizationRuleSet}
                      htmlString={annotation.content}
                    />
                    <div>
                      {
                        annotation.tags.map(tag => (
                          <Chip size="small" variant="outlined" label={tag} id={tag} className={classes.chip} key={tag.toString()} />
                        ))
                      }
                    </div>
                  </ListItemText>
                </MenuItem>
              );
            })
          }
        </MenuList>
      </>
    );
  }
}

CanvasAnnotations.propTypes = {
  annotations: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ),
  classes: PropTypes.objectOf(PropTypes.string),
  deselectAnnotation: PropTypes.func.isRequired,
  fullAnnotations: PropTypes.arrayOf(PropTypes.object),
  hoverAnnotation: PropTypes.func.isRequired,
  hoveredAnnotationIds: PropTypes.arrayOf(PropTypes.string),
  htmlSanitizationRuleSet: PropTypes.string,
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  listContainerComponent: PropTypes.elementType,
  selectAnnotation: PropTypes.func.isRequired,
  selectedAnnotationId: PropTypes.string,
  t: PropTypes.func.isRequired,
  totalSize: PropTypes.number.isRequired,
  windowId: PropTypes.string.isRequired,
};
CanvasAnnotations.defaultProps = {
  annotations: [],
  classes: {},
  fullAnnotations: [],
  hoveredAnnotationIds: [],
  htmlSanitizationRuleSet: 'iiif',
  listContainerComponent: 'li',
  selectedAnnotationId: undefined,
};
