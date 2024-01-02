import { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/SearchSharp';
import TextField from '@mui/material/TextField';
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
      annotations, autoscroll, index, label, selectedAnnotationId, t, totalSize,
      listContainerComponent, htmlSanitizationRuleSet, hoveredAnnotationIds,
      containerRef,
    } = this.props;
    if (annotations.length === 0) return null;

    const { inputSearch } = this.state;

    if (inputSearch != undefined && inputSearch !== '') {
      annotations = filterAnnotation(annotations, inputSearch);
    }

    const annotationCount = annotations.length;

    return (
      <>
        <Typography sx={{ paddingLeft: 2, paddingRight: 1, paddingTop: 2 }} variant="overline">
          {t('annotationCanvasLabel', { context: `${index + 1}/${totalSize}`, label })}
        </Typography>

        <div sx={{
          background: theme.palette.background.paper,
          borderBottom: `.5px solid ${theme.palette.section_divider}`,
          marginBottom: theme.spacing(1),
          padding: theme.spacing(0, 1, 1, 1),
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}>
          <TextField
            label={t('searchPlaceholderAnnotation')}
            onChange={this.handleAnnotationSearch}
            sx={{
              width: '100%',
            }}
            InputProps={{
              endAdornment: (
                <div sx={{
                  position: 'absolute',
                  right: 0,
                }}>
                  <MiradorMenuButton aria-label={t('searchAnnotationTooltip')} type="submit">
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
                  component={listContainerComponent}
                  variant="multiline"
                  divider
                  sx={{
                    '&:hover,&:focus': {
                      backgroundColor: 'action.hover',
                    },
                    backgroundColor: hoveredAnnotationIds.includes(annotation.id) ? 'action.hover' : '',
                  }}
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
                          <Chip size="small" variant="outlined" label={tag} id={tag} sx={{
                            backgroundColor: theme.palette.background.paper,
                            marginRight: theme.spacing(0.5),
                            marginTop: theme.spacing(1),
                          }} key={tag.toString()} />
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
        <div sx={{
          background: theme.palette.background.paper,
          borderTop: `.5px solid ${theme.palette.section_divider}`,
          bottom: 0,
          paddingBottom: theme.spacing(1),
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(1),
          paddingTop: theme.spacing(2),
          position: 'sticky',
        }}>
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
  containerRef: undefined,
  hoveredAnnotationIds: [],
  htmlSanitizationRuleSet: 'iiif',
  listContainerComponent: 'li',
  selectedAnnotationId: undefined,
};
