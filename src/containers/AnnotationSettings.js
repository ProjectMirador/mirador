import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import * as actions from '../state/actions';
import { withPlugins } from '../extend';
import {
  getAnnotationResourcesByMotivation,
  getSelectedTargetAnnotations,
  getSelectedCanvas,
} from '../state/selectors';
import { AnnotationSettings } from '../components/AnnotationSettings';

/**
 * Mapping redux state to component props using connect
 */
const mapStateToProps = (state, { windowId }) => ({
  displayAll: state.windows[windowId].displayAllAnnotations,
  displayAllDisabled: getAnnotationResourcesByMotivation(
    getSelectedTargetAnnotations(state, (getSelectedCanvas(state, { windowId }) || {}).id),
    ['oa:commenting', 'sc:painting'],
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
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('AnnotationSettings'),
);

export default enhance(AnnotationSettings);
