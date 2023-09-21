import { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import SanitizedHtml from '../containers/SanitizedHtml';
import TruncatedHit from '../lib/TruncatedHit';
import { ScrollTo } from './ScrollTo';

/** */
export class SearchHit extends Component {
  /** */
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Announce the annotation content if the component is mounted selected
   */
  componentDidMount() {
    const { selected } = this.props;

    if (selected) this.announceHit();
  }

  /**
   * Announce hit if the hit has been selected
   */
  componentDidUpdate(prevProps) {
    const { selected } = this.props;

    if (selected && selected !== prevProps.selected) {
      this.announceHit();
    }
  }

  /** */
  handleClick() {
    const {
      annotation, annotationId, selectAnnotation,
    } = this.props;

    if (annotation && annotationId) selectAnnotation(annotationId);
  }

  /**
   * Pass content describing the hit to the announcer prop (intended for screen readers)
   */
  announceHit() {
    const {
      annotation, annotationLabel, announcer, canvasLabel, hit, index, t, total,
    } = this.props;
    if (!hit || !announcer) return;
    const truncatedHit = new TruncatedHit(hit, annotation);

    announcer(
      [
        t('pagination', { current: index + 1, total }),
        canvasLabel,
        annotationLabel,
        truncatedHit.before,
        truncatedHit.match,
        truncatedHit.after,
      ].join(' '),
      'polite',
    );
  }

  /** */
  render() {
    const {
      adjacent,
      annotation,
      annotationLabel,
      canvasLabel,
      companionWindowId,
      containerRef,
      hit,
      focused,
      index,
      showDetails,
      selected,
      t,
      windowSelected,
    } = this.props;

    if (focused && !selected) return null;

    const truncatedHit = focused ? hit : hit && new TruncatedHit(hit, annotation);
    const truncated = hit && (truncatedHit.before !== hit.before || truncatedHit.after !== hit.after);
    const canvasLabelHtmlId = `${companionWindowId}-${index}`;

    return (
      <ScrollTo
        containerRef={containerRef}
        offsetTop={96} // offset for the height of the form above
        scrollTo={windowSelected && !focused}
      >
        <ListItem
          sx={{
            '&.Mui-focused': {
              '&:hover': {
                ...(windowSelected && {
                  backgroundColor: 'inherit',
                }),
              },
              ...(windowSelected && {
                backgroundColor: 'inherit',
              }),
            },
            borderBottom: '0.5px solid',
            borderBottomColor: 'divider',
            paddingRight: 1,

          }}
          button={!selected}
          component="li"
          onClick={this.handleClick}
          selected={selected}
        >
          <ListItemText primaryTypographyProps={{ variant: 'body1' }}>
            <Typography variant="subtitle2" sx={{ marginBottom: 1.5 }}>
              <Chip
                component="span"
                label={index + 1}
                sx={{
                  // eslint-disable-next-line no-nested-ternary
                  backgroundColor: windowSelected ? 'highlights.primary' : adjacent ? 'highlights.secondary' : 'hitCounter.default',
                  height: 30,
                  marginRight: 1,
                  typography: 'subtitle2',
                  verticalAlign: 'inherit',
                }}
              />
              <span id={canvasLabelHtmlId}>
                {canvasLabel}
              </span>
            </Typography>
            {annotationLabel && (
              <Typography variant="subtitle2">{annotationLabel}</Typography>
            )}
            {hit && (
              <>
                <SanitizedHtml ruleSet="iiif" htmlString={truncatedHit.before} />
                {' '}
                <strong>
                  <SanitizedHtml ruleSet="iiif" htmlString={truncatedHit.match} />
                </strong>
                {' '}
                <SanitizedHtml ruleSet="iiif" htmlString={truncatedHit.after} />
                {' '}
                { truncated && !focused && (
                  <Button
                    sx={{
                      '& span': {
                        lineHeight: '1.5em',
                      },
                      margin: 0,
                      padding: 0,
                      textTransform: 'none',
                    }}
                    onClick={showDetails}
                    color="secondary"
                    size="small"
                    aria-describedby={canvasLabelHtmlId}
                  >
                    {t('more')}
                  </Button>
                )}
              </>
            )}
            {!hit && annotation && <SanitizedHtml ruleSet="iiif" htmlString={annotation.chars} />}
          </ListItemText>
        </ListItem>
      </ScrollTo>
    );
  }
}

SearchHit.propTypes = {
  adjacent: PropTypes.bool,
  annotation: PropTypes.shape({
    chars: PropTypes.string,
    targetId: PropTypes.string,
  }),
  annotationId: PropTypes.string,
  annotationLabel: PropTypes.string,
  announcer: PropTypes.func,
  canvasLabel: PropTypes.string,
  companionWindowId: PropTypes.string,
  containerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  focused: PropTypes.bool,
  hit: PropTypes.shape({
    after: PropTypes.string,
    before: PropTypes.string,
    match: PropTypes.string,
  }),
  index: PropTypes.number,
  selectAnnotation: PropTypes.func,
  selected: PropTypes.bool,
  showDetails: PropTypes.func,
  t: PropTypes.func,
  total: PropTypes.number,
  windowId: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  windowSelected: PropTypes.bool,
};

SearchHit.defaultProps = {
  adjacent: false,
  annotation: undefined,
  annotationId: undefined,
  annotationLabel: undefined,
  announcer: undefined,
  canvasLabel: undefined,
  companionWindowId: undefined,
  containerRef: undefined,
  focused: false,
  hit: undefined,
  index: undefined,
  selectAnnotation: () => {},
  selected: false,
  showDetails: () => {},
  t: k => k,
  total: undefined,
  windowSelected: false,
};
