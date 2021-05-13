import {
  compose,
} from 'redux';
import {
  withTranslation,
} from 'react-i18next';
import {
  connect,
} from 'react-redux';
import {
  withPlugins,
} from '../extend/withPlugins';
import {
  AnnotationImageDialog,
} from '../components/AnnotationImageDialog';
import * as actions from '../state/actions';
import {
  getPresentAnnotationsOnSelectedCanvases,
  getSelectedAnnotationId,
  getWindow,
} from '../state/selectors';

/**
 * Mapping redux state to component props using connect
 */
const mapStateToProps = (state, {
  windowId,
}) => ({
  annotations: getPresentAnnotationsOnSelectedCanvases(state, {
    windowId,
  }),
  openedAnnotationImageId: getWindow(state, {
    windowId,
  }).openedAnnotationImageId,
  selectedAnnotationId: getSelectedAnnotationId(state, {
    windowId,
  }),
});

/**
 * Mapping redux action dispatches to component props using connect
 */
const mapDispatchToProps = (dispatch, { window }) => ({
  toggleAnnotationImage: (windowId, annotationId) => {
    dispatch(actions.toggleAnnotationImage(windowId, annotationId));
  },
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('AnnotationImageDialog'),
);

export default enhance(AnnotationImageDialog);
