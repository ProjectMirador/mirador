import { useState, useCallback } from 'react';
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
export function CanvasAnnotations({
  annotations = [],
  index,
  label,
  selectedAnnotationId = undefined,
  t,
  totalSize,
  listContainerComponent = 'li',
  htmlSanitizationRuleSet = 'iiif',
  hoveredAnnotationIds = [],
  containerRef = undefined,
  deselectAnnotation,
  selectAnnotation,
  windowId,
  hoverAnnotation,
}) {
  const [inputSearch, setInputSearch] = useState('');

  const handleClick = useCallback((_event, annotation) => {
    if (selectedAnnotationId === annotation.id) {
      deselectAnnotation(windowId, annotation.id);
    } else {
      selectAnnotation(windowId, annotation.id);
    }
  }, [windowId, deselectAnnotation, selectAnnotation, selectedAnnotationId]);

  const handleAnnotationHover = useCallback((annotation) => {
    hoverAnnotation(windowId, [annotation.id]);
  }, [hoverAnnotation, windowId]);

  const handleAnnotationBlur = useCallback(() => {
    hoverAnnotation(windowId, []);
  }, [hoverAnnotation, windowId]);

  if (annotations.length === 0) return null;

  let annotationsFiltered = annotations;

  if (inputSearch !== undefined && inputSearch !== '') {
    annotationsFiltered = filterAnnotation(annotations, inputSearch);
  }

  // TODO Count filtered or all ?
  const annotationCount = annotations.length;

  return (
    <>
      <Typography sx={{ paddingLeft: 2, paddingRight: 1, paddingTop: 2 }} variant="overline">
        {t('annotationCanvasLabel', { context: `${index + 1}/${totalSize}`, label })}
      </Typography>
      <StyledAnnotationContainer>
        <TextField
          label={t('searchPlaceholderAnnotation')}
          onChange={(e) => setInputSearch(e.target.value)}
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
        {annotationsFiltered.map((annotation) => (
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
                            /* ref={containerRef} */ // TODO useful ?
              key={annotation.id}
              annotationid={annotation.id}
              selected={selectedAnnotationId === annotation.id}
              onClick={(e) => handleClick(e, annotation)}
              onFocus={() => handleAnnotationHover(annotation)}
              onBlur={handleAnnotationBlur}
              onMouseEnter={() => handleAnnotationHover(annotation)}
              onMouseLeave={handleAnnotationBlur}
            >
              <ListItemText
                primaryTypographyProps={{ variant: 'body2' }}
              >
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
        ))}
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
        <Typography component="p" variant="subtitle2">
          {t('showingNumAnnotations', {
            count: annotationCount,
            number: annotationCount,
          })}
        </Typography>
      </StyledFooterAnnotationContainer>
    </>
  );
}

CanvasAnnotations.propTypes = {
  annotations: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ),
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
