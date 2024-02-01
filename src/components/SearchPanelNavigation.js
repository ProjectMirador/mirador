import { Component } from 'react';
import PropTypes from 'prop-types';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeftSharp';
import ChevronRightIcon from '@mui/icons-material/ChevronRightSharp';
import Typography from '@mui/material/Typography';
import MiradorMenuButton from '../containers/MiradorMenuButton';

/**
 * SearchPanelNavigation ~
*/
export class SearchPanelNavigation extends Component {
  /** */
  nextSearchResult(currentHitIndex) {
    const { searchHits, selectAnnotation } = this.props;
    selectAnnotation(searchHits[currentHitIndex + 1].annotations[0]);
  }

  /** */
  previousSearchResult(currentHitIndex) {
    const { searchHits, selectAnnotation } = this.props;
    selectAnnotation(searchHits[currentHitIndex - 1].annotations[0]);
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
      numTotal, searchHits, selectedContentSearchAnnotation, t, direction,
    } = this.props;

    const iconStyle = direction === 'rtl' ? { transform: 'rotate(180deg)' } : {};

    const currentHitIndex = searchHits
      .findIndex(val => val.annotations.includes(selectedContentSearchAnnotation[0]));
    let lengthText = searchHits.length;
    if (searchHits.length < numTotal) {
      lengthText += '+';
    }

    if (searchHits.length === 0) return null;

    return (
      <Typography variant="body2" align="center">
        <MiradorMenuButton
          aria-label={t('searchPreviousResult')}
          disabled={!this.hasPreviousResult(currentHitIndex)}
          onClick={() => this.previousSearchResult(currentHitIndex)}
        >
          <ChevronLeftIcon style={iconStyle} />
        </MiradorMenuButton>
        <span style={{ unicodeBidi: 'plaintext' }}>
          {t('pagination', { current: currentHitIndex + 1, total: lengthText })}
        </span>
        <MiradorMenuButton
          aria-label={t('searchNextResult')}
          disabled={!this.hasNextResult(currentHitIndex)}
          onClick={() => this.nextSearchResult(currentHitIndex)}
        >
          <ChevronRightIcon style={iconStyle} />
        </MiradorMenuButton>
      </Typography>
    );
  }
}
SearchPanelNavigation.propTypes = {
  direction: PropTypes.string.isRequired,
  numTotal: PropTypes.number,
  searchHits: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  searchService: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  selectAnnotation: PropTypes.func.isRequired,
  selectedContentSearchAnnotation: PropTypes.arrayOf(PropTypes.string).isRequired,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
};
SearchPanelNavigation.defaultProps = {
  numTotal: undefined,
  searchHits: [],
  t: key => key,
};
