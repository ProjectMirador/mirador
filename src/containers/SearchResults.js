import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { SearchResults } from '../components/SearchResults';
import * as actions from '../state/actions';
import {
  getSearchHitsForCompanionWindow,
  getSelectedContentSearchAnnotationIds,
} from '../state/selectors';

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SearchResult
 * @private
 */
const mapStateToProps = (state, { companionWindowId, windowId }) => ({
  searchHits: getSearchHitsForCompanionWindow(state, { companionWindowId, windowId }),
  selectedContentSearchAnnotation: getSelectedContentSearchAnnotationIds(state, { windowId }),
});

const mapDispatchToProps = {
  selectContentSearchAnnotation: actions.selectContentSearchAnnotation,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles({}),
  withTranslation(),
  withPlugins('SearchResults'),
);

export default enhance(SearchResults);
