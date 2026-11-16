import { useId } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import SanitizedHtml from '../containers/SanitizedHtml';
import { ScrollTo } from './ScrollTo';
import ns from '../config/css-ns';

const Root = styled(ListItem, { name: 'SearchHit', slot: 'root' })(({ ownerState, theme }) => ({
  '&.Mui-focused': {
    '&:hover': {
      ...(ownerState.windowSelected && {
        backgroundColor: 'inherit',
      }),
    },
    ...(ownerState.windowSelected && {
      backgroundColor: 'inherit',
    }),
  },
  ...(!ownerState.selected && {
    margin: 0,
    padding: 0,
  }),
}));

const CanvasLabel = styled('h4', { name: 'SearchHit', slot: 'canvasLabel' })(({ theme }) => ({
  display: 'inline',
  marginBottom: theme.spacing(1.5),
}));

const Counter = styled(Chip, { name: 'SearchHit', slot: 'counter' })(({ ownerState, theme }) => ({
  backgroundColor: theme.palette.hitCounter.default,
  ...(ownerState.windowSelected && {
    backgroundColor: theme.palette.highlights.primary,
  }),
  ...(ownerState.adjacent &&
    !ownerState.windowSelected && {
      backgroundColor: theme.palette.highlights.secondary,
    }),
  height: 30,
  marginRight: theme.spacing(1),
  typography: 'subtitle2',
  verticalAlign: 'inherit',
}));

/** Stub component that renders a button unless the item is selected (so the user can e.g. copy + paste the content easily) */
const ButtonUnlessSelected = ({ children, selected = false, ...props }) =>
  selected ? <>{children}</> : <ListItemButton {...props}>{children}</ListItemButton>;

ButtonUnlessSelected.propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool,
};

/** */
// eslint-disable-next-line complexity
export function SearchHitItem({
  adjacent = false,
  annotation = undefined,
  annotationLabel = undefined,
  canvasLabel = undefined,
  containerRef = undefined,
  focused = false,
  hit = undefined,
  index = undefined,
  onMoreClick = () => {},
  onSelect = () => {},
  renderedHit = undefined,
  selected = false,
  windowSelected = false,
}) {
  const { t } = useTranslation();
  const canvasLabelHtmlId = useId();

  const hasHitContent = Boolean(hit && hit.match && renderedHit);
  const truncated = hasHitContent && (renderedHit.before !== hit.before || renderedHit.after !== hit.after);
  const ownerState = {
    adjacent,
    focused,
    selected,
    windowSelected,
  };

  const header = (
    <>
      <Counter component="span" ownerState={ownerState} label={index + 1} />
      <CanvasLabel id={canvasLabelHtmlId}>
        {canvasLabel}
        {annotationLabel && (
          <Typography component="span" sx={{ display: 'block', marginTop: 1 }}>
            {annotationLabel}
          </Typography>
        )}
      </CanvasLabel>
    </>
  );

  return (
    <ScrollTo
      containerRef={containerRef}
      offsetTop={96} // offset for the height of the form above
      scrollTo={windowSelected && !focused}
    >
      <Root ownerState={ownerState} className={classNames(ns('search-hit'), windowSelected ? 'windowSelected' : '')} divider>
        <ButtonUnlessSelected selected={selected} onClick={onSelect}>
          <ListItemText
            primary={header}
            secondary={
              <>
                {hasHitContent && (
                  <>
                    <SanitizedHtml ruleSet="iiif" htmlString={renderedHit.before} />{' '}
                    <strong>
                      <SanitizedHtml ruleSet="iiif" htmlString={renderedHit.match} />
                    </strong>{' '}
                    <SanitizedHtml ruleSet="iiif" htmlString={renderedHit.after} />{' '}
                    {truncated && !focused && (
                      <Button
                        sx={{
                          '& span': {
                            lineHeight: '1.5em',
                          },
                          margin: 0,
                          padding: 0,
                          textTransform: 'none',
                        }}
                        onClick={onMoreClick}
                        color="secondary"
                        size="small"
                        aria-describedby={canvasLabelHtmlId}
                      >
                        {t('more')}
                      </Button>
                    )}
                  </>
                )}
                {!hasHitContent && annotation && <SanitizedHtml ruleSet="iiif" htmlString={annotation.chars} />}
              </>
            }
            slotProps={{
              primary: {
                component: 'div',
                sx: { marginBottom: 1 },
                variant: 'subtitle2',
              },
              secondary: { variant: 'body1' },
            }}
          />
        </ButtonUnlessSelected>
      </Root>
    </ScrollTo>
  );
}

SearchHitItem.propTypes = {
  adjacent: PropTypes.bool,
  annotation: PropTypes.shape({
    chars: PropTypes.string,
    targetId: PropTypes.string,
  }),
  annotationLabel: PropTypes.string,
  canvasLabel: PropTypes.string,
  containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })]),
  focused: PropTypes.bool,
  hit: PropTypes.shape({
    after: PropTypes.string,
    before: PropTypes.string,
    match: PropTypes.string,
  }),
  index: PropTypes.number,
  onMoreClick: PropTypes.func,
  onSelect: PropTypes.func,
  renderedHit: PropTypes.shape({
    after: PropTypes.string,
    before: PropTypes.string,
    match: PropTypes.string,
  }),
  selected: PropTypes.bool,
  windowSelected: PropTypes.bool,
};

export default SearchHitItem;
