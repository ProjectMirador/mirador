import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import BackIcon from '@material-ui/icons/ArrowBackSharp';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import SanitizedHtml from '../containers/SanitizedHtml';

/** */
export class SearchResults extends Component {
  /** */
  constructor(props) {
    super(props);

    this.state = { focused: false };

    this.renderHit = this.renderHit.bind(this);
    this.toggleFocus = this.toggleFocus.bind(this);
  }

  /** */
  toggleFocus() {
    const {
      focused,
    } = this.state;

    this.setState({ focused: !focused });
  }

  /** */
  renderHit(hit, index) {
    const {
      classes,
      companionWindowId,
      selectContentSearchAnnotation,
      selectedContentSearchAnnotation,
      t,
      windowId,
    } = this.props;

    const {
      focused,
    } = this.state;

    const selected = selectedContentSearchAnnotation[0] === hit.annotations[0];
    const truncated = true;

    if (focused && !selected) return null;

    return (
      <ListItem
        className={clsx(
          classes.listItem,
          {
            [classes.selected]: selected,
            [classes.focused]: focused,
          },
        )}
        button={!selected}
        key={`${companionWindowId}-${hit.annotations[0]}`}
        component="li"
        onClick={() => selectContentSearchAnnotation(windowId, hit.annotations)}
        selected={selected}
      >
        <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
          <Typography>
            <Chip label={index + 1} className={classes.hitCounter} />
          </Typography>
          <SanitizedHtml ruleSet="iiif" htmlString={hit.before} />
          {' '}
          <strong>
            <SanitizedHtml ruleSet="iiif" htmlString={hit.match} />
          </strong>
          {' '}
          <SanitizedHtml ruleSet="iiif" htmlString={hit.after} />
          {' '}
          { truncated && !focused && (
            <Button className={classes.inlineButton} onClick={this.toggleFocus} color="secondary" size="small">
              {t('more')}
            </Button>
          )}
        </ListItemText>
      </ListItem>
    );
  }

  /** */
  render() {
    const {
      classes,
      searchHits,
      t,
    } = this.props;

    const {
      focused,
    } = this.state;

    return (
      <>
        { focused && (
          <Button onClick={this.toggleFocus} className={classes.navigation} size="small">
            <BackIcon />
            {t('backToResults')}
          </Button>
        )}
        <List>
          {
            searchHits.map(this.renderHit)
          }
        </List>
      </>
    );
  }
}

SearchResults.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  companionWindowId: PropTypes.string.isRequired,
  searchHits: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectContentSearchAnnotation: PropTypes.func,
  selectedContentSearchAnnotation: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
};

SearchResults.defaultProps = {
  classes: {},
  selectContentSearchAnnotation: () => {},
  selectedContentSearchAnnotation: [],
  t: k => k,
};
