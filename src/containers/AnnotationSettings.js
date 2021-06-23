import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import * as actions from '../state/actions';
import { withPlugins } from '../extend/withPlugins';
import {
  getAnnotationResourcesByMotivation,
  getPresentAnnotationsOnSelectedCanvases,
  getSelectedAnnotationId,
  getWindow,
} from '../state/selectors';
import { AnnotationSettings } from '../components/AnnotationSettings';

/**
 * Mapping redux state to component props using connect
 */
const mapStateToProps = (state, { windowId }) => ({
  annotations: getPresentAnnotationsOnSelectedCanvases(state, { windowId }),
  displayAll: getWindow(state, { windowId }).highlightAllAnnotations,
  displayAllDisabled: getAnnotationResourcesByMotivation(
    state,
    { windowId },
  ).length < 2,
  selectedAnnotationId: getSelectedAnnotationId(state, { windowId }),
});

/**
 * Mapping redux action dispatches to component props using connect
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  toggleAnnotationDisplay: () => {
    dispatch(actions.toggleAnnotationDisplay(windowId));
  },
  toggleAnnotationImage: (windowID, annotationId) => {
    dispatch(actions.toggleAnnotationImage(windowID, annotationId));
  },
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('AnnotationSettings'),
);

export default enhance(AnnotationSettings);
