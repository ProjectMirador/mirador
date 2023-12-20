import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import * as actions from '../state/actions';
import { withPlugins } from '../extend/withPlugins';
import {
  getAnnotationResourcesByMotivation,
  getWindow,
} from '../state/selectors';
import { AnnotationSettings } from '../components/AnnotationSettings';
import { withWindowContext } from '../contexts/WindowContext';

/**
 * Mapping redux state to component props using connect
 */
const mapStateToProps = (state, { windowId }) => ({
  displayAll: getWindow(state, { windowId }).highlightAllAnnotations,
  displayAllDisabled: getAnnotationResourcesByMotivation(
    state,
    { windowId },
  ).length < 2,
});

/**
 * Mapping redux action dispatches to component props using connect
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  toggleAnnotationDisplay: () => {
    dispatch(actions.toggleAnnotationDisplay(windowId));
  },
});

const enhance = compose(
  withTranslation(),
  withWindowContext,
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('AnnotationSettings'),
);

export default enhance(AnnotationSettings);
