import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { SearchPanelNavigation } from '../components/SearchPanelNavigation';
import * as actions from '../state/actions';
import { getSelectedContentSearchAnnotationIds, getSortedSearchHitsForCompanionWindow, getThemeDirection } from '../state/selectors';
/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SearchPanelControls
 * @private
 */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var companionWindowId = _ref.companionWindowId,
      windowId = _ref.windowId;
  return {
    direction: getThemeDirection(state),
    searchHits: getSortedSearchHitsForCompanionWindow(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    }),
    selectedContentSearchAnnotation: getSelectedContentSearchAnnotationIds(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    })
  };
};
/**
 * mapDispatchToProps - to hook up connect
 * @memberof SearchPanelNavigation
 * @private
 */


var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var windowId = _ref2.windowId;
  return {
    selectAnnotation: function selectAnnotation() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return dispatch(actions.selectAnnotation.apply(actions, [windowId].concat(args)));
    }
  };
};
/** */


var styles = function styles(theme) {
  return {
    body2: {
      marginLeft: '-16px',
      width: '100%'
    }
  };
};

var enhance = compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles), withTranslation(), withPlugins('SearchPanelNavigation'));
export default enhance(SearchPanelNavigation);