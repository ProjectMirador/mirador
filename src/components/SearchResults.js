import { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import BackIcon from '@mui/icons-material/ArrowBackSharp';
import { announce } from '@react-aria/live-announcer';
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
  renderSearchHitsAndAnnotations() {
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
          announcer={announce}
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
        announcer={announce}
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
      companionWindowId,
      containerRef,
      isFetching,
      fetchSearch,
      nextSearch,
      query,
      searchAnnotations,
      searchHits,
      searchNumTotal,
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
            <Button onClick={this.toggleFocus} sx={{ textTransform: 'none' }} size="small">
              <BackIcon />
              {t('backToResults')}
            </Button>
          </ScrollTo>
        )}
        {noResultsState && (
          <Typography sx={{
            padding: 2,
            typography: 'h6',
          }}
          >
            {t('searchNoResults')}
          </Typography>
        )}
        <List disablePadding>
          { this.renderSearchHitsAndAnnotations() }
        </List>
        { nextSearch && (
          <Button
            sx={{ width: '100%' }}
            color="secondary"
            onClick={() => fetchSearch(windowId, companionWindowId, nextSearch, query)}
          >
            {t('moreResults')}
            <br />
            {`(${t('searchResultsRemaining', { numLeft: searchNumTotal - searchHits.length })})`}
          </Button>
        )}
      </>
    );
  }
}

SearchResults.propTypes = {
  companionWindowId: PropTypes.string.isRequired,
  containerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  fetchSearch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  nextSearch: PropTypes.string,
  query: PropTypes.string,
  searchAnnotations: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  searchHits: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  searchNumTotal: PropTypes.number,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
};

SearchResults.defaultProps = {
  containerRef: undefined,
  isFetching: false,
  nextSearch: undefined,
  query: undefined,
  searchAnnotations: [],
  searchHits: [],
  searchNumTotal: undefined,
  t: k => k,
};
