import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { SearchPanelControls } from '../components/SearchPanelControls';
import * as actions from '../state/actions';
import { getManifestAutocompleteService, getManifestSearchService, getSearchIsFetching, getSearchQuery } from '../state/selectors';
/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SearchPanelControls
 * @private
 */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var companionWindowId = _ref.companionWindowId,
      windowId = _ref.windowId;
  return {
    autocompleteService: getManifestAutocompleteService(state, {
      windowId: windowId
    }),
    query: getSearchQuery(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    }),
    searchIsFetching: getSearchIsFetching(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    }),
    searchService: getManifestSearchService(state, {
      windowId: windowId
    })
  };
};
/**
 * mapDispatchToProps - to hook up connect
 * @memberof SearchPanelControls
 * @private
 */


var mapDispatchToProps = {
  fetchSearch: actions.fetchSearch
};
/** */

var styles = function styles(theme) {
  return {
    endAdornment: {
      position: 'absolute',
      right: 0
    },
    form: {
      paddingBottom: theme.spacing(1),
      paddingRight: theme.spacing(1.5),
      width: '100%'
    },
    searchProgress: {
      position: 'absolute',
      right: 0
    }
  };
};

var enhance = compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles), withTranslation(), withPlugins('SearchPanelControls'));
export default enhance(SearchPanelControls);