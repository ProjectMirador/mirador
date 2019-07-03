import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeftSharp';
import ChevronRightIcon from '@material-ui/icons/ChevronRightSharp';
import Typography from '@material-ui/core/Typography';
import MiradorMenuButton from '../containers/MiradorMenuButton';

/**
 * SearchPanelNavigation ~
*/
export class SearchPanelNavigation extends Component {
  /** */
  nextSearchResult(currentHitIndex) {
    const { searchHits, selectContentSearchAnnotation } = this.props;
    selectContentSearchAnnotation(searchHits[currentHitIndex + 1].annotations);
  }

  /** */
  previousSearchResult(currentHitIndex) {
    const { searchHits, selectContentSearchAnnotation } = this.props;
    selectContentSearchAnnotation(searchHits[currentHitIndex - 1].annotations);
  }

  /** */
  hasNextResult(currentHitIndex) {
    const { searchHits } = this.props;
    if (searchHits.length === 0) return false;
    if (currentHitIndex < searchHits.length - 1) return true;
    return false;
  }

  /** */
  hasPreviousResult(currentHitIndex) {
    const { searchHits } = this.props;
    if (searchHits.length === 0) return false;
    if (currentHitIndex > 0) return true;
    return false;
  }

  /**
   * Returns the rendered component
  */
  render() {
    const {
      searchHits, selectedContentSearchAnnotation, classes, t,
    } = this.props;
    const currentHitIndex = searchHits
      .findIndex(val => val.annotations.includes(selectedContentSearchAnnotation[0]));
    return (
      <>
        {(searchHits.length > 0) && (
          <Typography variant="body2" align="center" classes={classes}>
            <MiradorMenuButton
              aria-label={t('searchPreviousResult')}
              disabled={!this.hasPreviousResult(currentHitIndex)}
              onClick={() => this.previousSearchResult(currentHitIndex)}
            >
              <ChevronLeftIcon />
            </MiradorMenuButton>
              {t('pagination', { current: currentHitIndex + 1, total: searchHits.length })}
            <MiradorMenuButton
              aria-label={t('searchNextResult')}
              disabled={!this.hasNextResult(currentHitIndex)}
              onClick={() => this.nextSearchResult(currentHitIndex)}
            >
              <ChevronRightIcon />
            </MiradorMenuButton>
          </Typography>
        )}
      </>
    );
  }
}
SearchPanelNavigation.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  searchHits: PropTypes.arrayOf(PropTypes.object),
  searchService: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  selectContentSearchAnnotation: PropTypes.func.isRequired,
  selectedContentSearchAnnotation: PropTypes.arrayOf(PropTypes.string).isRequired,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
};
SearchPanelNavigation.defaultProps = {
  classes: {},
  searchHits: [],
  t: key => key,
};
