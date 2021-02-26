import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import * as actions from '../state/actions';
import { withPlugins } from '../extend/withPlugins';
import { getAnnotationResourcesByMotivation, getWindow } from '../state/selectors';
import { AnnotationSettings } from '../components/AnnotationSettings';
/**
 * Mapping redux state to component props using connect
 */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    displayAll: getWindow(state, {
      windowId: windowId
    }).highlightAllAnnotations,
    displayAllDisabled: getAnnotationResourcesByMotivation(state, {
      windowId: windowId
    }).length < 2
  };
};
/**
 * Mapping redux action dispatches to component props using connect
 */


var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var windowId = _ref2.windowId;
  return {
    toggleAnnotationDisplay: function toggleAnnotationDisplay() {
      dispatch(actions.toggleAnnotationDisplay(windowId));
    }
  };
};

var enhance = compose(withTranslation(), connect(mapStateToProps, mapDispatchToProps), withPlugins('AnnotationSettings'));
export default enhance(AnnotationSettings);