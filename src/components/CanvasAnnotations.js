import { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/SearchSharp';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import SanitizedHtml from '../containers/SanitizedHtml';
import { ScrollTo } from './ScrollTo';
import AnnotationManifestsAccordion from '../containers/AnnotationManifestsAccordion';
import { filterAnnotation } from '../helper/utils';
import { MiradorMenuButton } from './MiradorMenuButton';

const StyledAnnotationContainer = styled('div')(({ theme }) => ({
  background: theme.palette.background.paper,
  borderBottom: `.5px solid ${theme.palette.section_divider}`,
  marginBottom: theme.spacing(1),
  padding: theme.spacing(0, 1, 1, 1),
  position: 'sticky',
  top: 0,
  zIndex: 10,
}));

const StyledFooterAnnotationContainer = styled('div')(({ theme }) => ({
  background: theme.palette.background.paper,
  borderTop: `.5px solid ${theme.palette.section_divider}`,
  bottom: 0,
  paddingBottom: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(1),
  paddingTop: theme.spacing(2),
  position: 'sticky',
}));

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
      annotations, autoScroll, index, label, selectedAnnotationId, t, totalSize,
      listContainerComponent, htmlSanitizationRuleSet, hoveredAnnotationIds,
      containerRef,
    } = this.props;
    if (annotations.length === 0) return null;

    let annotationsFiltered = annotations;

    const { inputSearch } = this.state;

    if (inputSearch !== undefined && inputSearch !== '') {
      annotationsFiltered = filterAnnotation(annotations, inputSearch);
    }

    const annotationCount = annotations.length;

    console.log('CanvasAnnotations containerRef : ', containerRef);

    if (!containerRef.current) {
      return <div>containerRef is null</div>;
    }

    return (
      <>
        <Typography sx={{ paddingLeft: 2, paddingRight: 1, paddingTop: 2 }} variant="overline">
          {t('annotationCanvasLabel', { context: `${index + 1}/${totalSize}`, label })}
        </Typography>

        <StyledAnnotationContainer>
          <TextField
            label={t('searchPlaceholderAnnotation')}
            onChange={this.handleAnnotationSearch}
            sx={{
              width: '100%',
            }}
            InputProps={{
              endAdornment: (
                <div style={{
                  position: 'absolute',
                  right: 0,
                }}
                >
                  <MiradorMenuButton aria-label={t('searchAnnotationTooltip')} type="submit">
                    <SearchIcon />
                  </MiradorMenuButton>
                </div>
              ),
            }}
          />
        </StyledAnnotationContainer>
        <MenuList autoFocusItem variant="selectedMenu">
          {
            annotationsFiltered.map(annotation => (
              <ScrollTo
                containerRef={containerRef}
                key={`${annotation.id}-scroll`}
                offsetTop={96} // offset for the height of the form above
                scrollTo={selectedAnnotationId === annotation.id}
                selected={selectedAnnotationId === annotation.id}
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
                  ref={containerRef}
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
                          <Chip
                            size="small"
                            variant="outlined"
                            label={tag}
                            id={tag}
                            sx={theme => ({
                              backgroundColor: theme.palette.background.paper,
                              marginRight: theme.spacing(0.5),
                              marginTop: theme.spacing(1),
                            })}
                            key={tag.toString()}
                          />
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
          {annotationsFiltered.length === 0
            && (
              <MenuItem>
                <Typography>
                  {t('noAnnotationFound')}
                </Typography>
              </MenuItem>
            )}
        </MenuList>
        <StyledFooterAnnotationContainer>
          <Typography component="p" variant="subtitle2">{t('showingNumAnnotations', { count: annotationCount, number: annotationCount })}</Typography>
        </StyledFooterAnnotationContainer>
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
  autoScroll: true,
  containerRef: null,
  hoveredAnnotationIds: [],
  htmlSanitizationRuleSet: 'iiif',
  listContainerComponent: 'li',
  selectedAnnotationId: undefined,
};
