import { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Chip from '@mui/material/Chip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import SanitizedHtml from '../containers/SanitizedHtml';
import { ScrollTo } from './ScrollTo';

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

  /**
   * Returns the rendered component
  */
  render() {
    const {
      annotations, classes, index, label, selectedAnnotationId, t, totalSize,
      listContainerComponent, htmlSanitizationRuleSet, hoveredAnnotationIds,
      containerRef,
    } = this.props;
    if (annotations.length === 0) return null;

    return (
      <>
        <Typography className={classes.sectionHeading} variant="overline">
          {t('annotationCanvasLabel', { context: `${index + 1}/${totalSize}`, label })}
        </Typography>
        <MenuList autoFocusItem variant="selectedMenu">
          {
            annotations.map(annotation => (
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
                <ScrollTo
                  containerRef={containerRef}
                  key={`${annotation.id}-scroll`}
                  offsetTop={96} // offset for the height of the form above
                  scrollTo={selectedAnnotationId === annotation.id}
                >
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
                </ScrollTo>
              </MenuItem>
            ))
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
  containerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  deselectAnnotation: PropTypes.func.isRequired,
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
  containerRef: undefined,
  hoveredAnnotationIds: [],
  htmlSanitizationRuleSet: 'iiif',
  listContainerComponent: 'li',
  selectedAnnotationId: undefined,
};
