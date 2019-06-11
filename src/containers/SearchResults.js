import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { SearchResults } from '../components/SearchResults';
import {
  getSearchHitsForManifest,
} from '../state/selectors';

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SearchResult
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  searchHits: getSearchHitsForManifest(state, { windowId }),
});

const enhance = compose(
  connect(mapStateToProps, null),
  withStyles({}),
  withTranslation(),
  withPlugins('SearchResults'),
);

export default enhance(SearchResults);
