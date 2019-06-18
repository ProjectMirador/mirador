import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import BackIcon from '@material-ui/icons/ArrowBackSharp';
import SearchHit from '../containers/SearchHit';

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
          <Button onClick={this.toggleFocus} className={classes.navigation} size="small">
            <BackIcon />
            {t('backToResults')}
          </Button>
        )}
        {noResultsState && (
          <Typography className={classes.noResults}>
            {t('searchNoResults')}
          </Typography>
        )}
        <List disablePadding>
          {
            searchHits.map((hit, index) => (
              <SearchHit
                containerRef={containerRef}
                companionWindowId={companionWindowId}
                key={hit.annotations[0]}
                focused={focused}
                hit={hit}
                index={index}
                windowId={windowId}
                showDetails={this.toggleFocus}
              />
            ))
          }
          { searchHits.length === 0
            && searchAnnotations.length > 0
            && searchAnnotations.map((anno, index) => (
              <SearchHit
                annotationId={anno.id}
                companionWindowId={companionWindowId}
                containerRef={containerRef}
                key={anno.id}
                focused={focused}
                index={index}
                windowId={windowId}
                showDetails={this.toggleFocus}
              />
            ))}
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
