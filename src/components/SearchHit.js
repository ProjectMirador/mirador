import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import SanitizedHtml from '../containers/SanitizedHtml';
import TruncatedHit from '../lib/TruncatedHit';

/** */
export class SearchHit extends Component {
  /** */
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  /** */
  handleClick() {
    const {
      annotationId, selectContentSearchAnnotation, windowId,
    } = this.props;

    selectContentSearchAnnotation(windowId, [annotationId]);
  }

  /** */
  render() {
    const {
      adjacent,
      annotationLabel,
      canvasLabel,
      classes,
      hit,
      focused,
      index,
      showDetails,
      selected,
      t,
    } = this.props;

    if (focused && !selected) return null;

    const truncatedHit = focused ? hit : hit && new TruncatedHit(hit);
    const truncated = hit && truncatedHit.before !== hit.before && truncatedHit.after !== hit.after;

    return (
      <ListItem
        className={clsx(
          classes.listItem,
          {
            [classes.adjacent]: adjacent,
            [classes.selected]: selected,
            [classes.focused]: focused,
          },
        )}
        button={!selected}
        component="li"
        onClick={this.handleClick}
        selected={selected}
      >
        <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
          <Typography className={classes.canvasLabel}>
            <Chip component="span" label={index + 1} className={classes.hitCounter} />
            {canvasLabel}
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
                <Button className={classes.inlineButton} onClick={showDetails} color="secondary" size="small">
                  {t('more')}
                </Button>
              )}
            </>
          )}
        </ListItemText>
      </ListItem>
    );
  }
}

SearchHit.propTypes = {
  adjacent: PropTypes.bool,
  annotationId: PropTypes.string,
  annotationLabel: PropTypes.string,
  canvasLabel: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string),
  focused: PropTypes.bool,
  hit: PropTypes.shape({
    after: PropTypes.string,
    before: PropTypes.string,
    match: PropTypes.string,
  }),
  index: PropTypes.number,
  selectContentSearchAnnotation: PropTypes.func,
  selected: PropTypes.bool,
  showDetails: PropTypes.func,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
};

SearchHit.defaultProps = {
  adjacent: false,
  annotationId: undefined,
  annotationLabel: undefined,
  canvasLabel: undefined,
  classes: {},
  focused: false,
  hit: undefined,
  index: undefined,
  selectContentSearchAnnotation: () => {},
  selected: false,
  showDetails: () => {},
  t: k => k,
};
