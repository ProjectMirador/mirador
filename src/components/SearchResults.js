import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import BackIcon from '@material-ui/icons/ArrowBackSharp';
import { LiveMessenger } from 'react-aria-live';
import SearchHit from '../containers/SearchHit';
import { ScrollTo } from './ScrollTo';

/** */
export class SearchResults extends Component {
  /** */
  constructor(props) {
    super(props);

    this.state = { focused: false };

    this.toggleFocus = this.toggleFocus.bind(this);
  }

  /** */
  toggleFocus() {
    const {
      focused,
    } = this.state;

    this.setState({ focused: !focused });
  }

  /**
   * Return SearchHits for every hit in the response
   * Return SearchHits for every annotation in the response if there are no hits
   */
  renderSearchHitsAndAnnotations(announcer) {
    const {
      companionWindowId,
      containerRef,
      searchAnnotations,
      searchHits,
      windowId,
    } = this.props;
    const {
      focused,
    } = this.state;

    if (searchHits.length === 0 && searchAnnotations.length > 0) {
      return searchAnnotations.map((anno, index) => (
        <SearchHit
          announcer={announcer}
          annotationId={anno.id}
          companionWindowId={companionWindowId}
          containerRef={containerRef}
          key={anno.id}
          focused={focused}
          index={index}
          total={searchAnnotations.length}
          windowId={windowId}
          showDetails={this.toggleFocus}
        />
      ));
    }

    return searchHits.map((hit, index) => (
      <SearchHit
        announcer={announcer}
        containerRef={containerRef}
        companionWindowId={companionWindowId}
        key={hit.annotations[0]}
        focused={focused}
        hit={hit}
        index={index}
        total={searchHits.length}
        windowId={windowId}
        showDetails={this.toggleFocus}
      />
    ));
  }

  /** */
  render() {
    const {
      classes,
      companionWindowId,
      containerRef,
      isFetching,
      fetchSearch,
      nextSearch,
      query,
      searchAnnotations,
      searchHits,
      t,
      windowId,
    } = this.props;

    const {
      focused,
    } = this.state;

    const noResultsState = (
      query && !isFetching && searchHits.length === 0 && searchAnnotations.length === 0
    );

    return (
      <>
        { focused && (
          <ScrollTo containerRef={containerRef} offsetTop={96} scrollTo>
            <Button onClick={this.toggleFocus} className={classes.navigation} size="small">
              <BackIcon />
              {t('backToResults')}
            </Button>
          </ScrollTo>
        )}
        {noResultsState && (
          <Typography className={classes.noResults}>
            {t('searchNoResults')}
          </Typography>
        )}
        <List disablePadding>
          <LiveMessenger>
            {({ announcePolite }) => this.renderSearchHitsAndAnnotations(announcePolite) }
          </LiveMessenger>
        </List>
        { nextSearch && (
          <Button color="secondary" onClick={() => fetchSearch(windowId, companionWindowId, nextSearch, query)}>
            {t('moreResults')}
          </Button>
        )}
      </>
    );
  }
}

SearchResults.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  companionWindowId: PropTypes.string.isRequired,
  containerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  fetchSearch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  nextSearch: PropTypes.string,
  query: PropTypes.string,
  searchAnnotations: PropTypes.arrayOf(PropTypes.object),
  searchHits: PropTypes.arrayOf(PropTypes.object),
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
};

SearchResults.defaultProps = {
  classes: {},
  containerRef: undefined,
  isFetching: false,
  nextSearch: undefined,
  query: undefined,
  searchAnnotations: [],
  searchHits: [],
  t: k => k,
};
