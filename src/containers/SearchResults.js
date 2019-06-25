import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { SearchResults } from '../components/SearchResults';
import * as actions from '../state/actions';
import {
  getNextSearchId,
  getSearchAnnotationsForCompanionWindow,
  getSearchQuery,
  getSearchIsFetching,
  getSortedSearchHitsForCompanionWindow,
} from '../state/selectors';

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SearchResult
 * @private
 */
const mapStateToProps = (state, { companionWindowId, windowId }) => ({
  isFetching: getSearchIsFetching(state, { companionWindowId, windowId }),
  nextSearch: getNextSearchId(state, { companionWindowId, windowId }),
  query: getSearchQuery(state, { companionWindowId, windowId }),
  searchAnnotations:
    getSearchAnnotationsForCompanionWindow(state, { companionWindowId, windowId }).resources,
  searchHits: getSortedSearchHitsForCompanionWindow(state, { companionWindowId, windowId }),
});

const mapDispatchToProps = {
  fetchSearch: actions.fetchSearch,
};

/** */
const styles = theme => ({
  navigation: {
    textTransform: 'none',
  },
  noResults: {
    ...theme.typography.h6,
    padding: theme.spacing(2),
  },
  toggleFocus: {
    ...theme.typography.subtitle1,
  },
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withTranslation(),
  withPlugins('SearchResults'),
);

export default enhance(SearchResults);
