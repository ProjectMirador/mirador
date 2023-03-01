import { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Chip from '@material-ui/core/Chip';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/SearchSharp';
import InputBase from '@material-ui/core/InputBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import SanitizedHtml from '../containers/SanitizedHtml';
import { ScrollTo } from './ScrollTo';
import AnnotationManifestsAccordion from '../containers/AnnotationManifestsAccordion';
import { filterAnnotation } from '../helper/utils';
import { MiradorMenuButton } from './MiradorMenuButton';

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
    this.handleAnnotationSearch = this.handleAnnotationSearch.bind(this);

    this.state = { };
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
  handleAnnotationSearch(event) {
    this.setState({ inputSearch: event.target.value });
  }

  /**
   * Returns the rendered component
  */
  render() {
    const {
      autoScroll, classes, index, label, selectedAnnotationId, t, totalSize,
      listContainerComponent, htmlSanitizationRuleSet, hoveredAnnotationIds,
      containerRef,
    } = this.props;

    let { annotations } = this.props;

    if (annotations.length === 0) return null;

    const { inputSearch } = this.state;

    if (inputSearch != undefined && inputSearch !== '') {
      annotations = filterAnnotation(annotations, inputSearch);
    }

    const annotationCount = annotations.length;

    return (
      <>
        <div className={classes.headerAnnotationPanel}>
          <TextField
            label={t('searchPlaceholderAnnotation')}
            onChange={this.handleAnnotationSearch}
            className={classes.searchAnnotationsTextfield}
            InputProps={{
              endAdornment: (
                <div className={classes.endAdornment}>
                  <MiradorMenuButton aria-label={t('searchSubmitAria')} type="submit">
                    <SearchIcon />
                  </MiradorMenuButton>
                </div>
              ),
            }}
          />
        </div>
        <MenuList autoFocusItem variant="selectedMenu">
          {
            annotations.map(annotation => (
              <ScrollTo
                containerRef={containerRef}
                key={`${annotation.id}-scroll`}
                offsetTop={96} // offset for the height of the form above
                scrollTo={autoScroll ? (selectedAnnotationId === annotation.id) : false}
              >
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
                      <AnnotationManifestsAccordion
                        annotation={annotation}
                        t={t}
                      />
                    </div>
                  </ListItemText>
                </MenuItem>
              </ScrollTo>
            ))
          }
          {annotations.length == 0
            && (
            <MenuItem>
              <Typography>
                {t('noAnnotationFound')}
              </Typography>
            </MenuItem>
            )}
        </MenuList>
        <div className={classes.footerAnnotationPanel}>
          <Typography component="p" variant="subtitle2">{t('showingNumAnnotations', { count: annotationCount, number: annotationCount })}</Typography>
        </div>
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
  autoScroll: PropTypes.bool,
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
  autoScroll: true,
  classes: {},
  containerRef: undefined,
  hoveredAnnotationIds: [],
  htmlSanitizationRuleSet: 'iiif',
  listContainerComponent: 'li',
  selectedAnnotationId: undefined,
};
