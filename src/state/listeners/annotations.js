import { createListenerMiddleware } from '@reduxjs/toolkit';
import ActionTypes from '../actions/action-types';
import { receiveAnnotation, receiveAnnotationFailure } from '../actions';
import { getRequestsConfig } from '../selectors';
import { iiifApi } from '../api/iiifApi';

export const annotationsListenerMiddleware = createListenerMiddleware();

/**
 * Bridges the iiifApi.getAnnotation RTK Query endpoint back to the legacy
 * REQUEST_ANNOTATION/RECEIVE_ANNOTATION/RECEIVE_ANNOTATION_FAILURE actions,
 * so anything still watching those ActionTypes (sagas, plugins) keeps
 * working unchanged, with RTK Query as the actual fetch/cache underneath.
 */
annotationsListenerMiddleware.startListening({
  type: ActionTypes.REQUEST_ANNOTATION,
  effect: (action, listenerApi) => {
    const { targetId, annotationId } = action;
    listenerApi.dispatch(iiifApi.endpoints.getAnnotation.initiate({ annotationId, targetId }));
  },
});

annotationsListenerMiddleware.startListening({
  matcher: iiifApi.endpoints.getAnnotation.matchFulfilled,
  effect: (action, listenerApi) => {
    const { targetId, annotationId } = action.meta.arg.originalArgs;
    const { postprocessors = [] } = getRequestsConfig(listenerApi.getState());

    let receivedAction = { annotationId, annotationJson: action.payload, targetId };
    receivedAction = postprocessors.reduce((acc, f) => f(annotationId, acc) || acc, receivedAction);

    listenerApi.dispatch(receiveAnnotation(receivedAction.targetId, receivedAction.annotationId, receivedAction.annotationJson));
  },
});

annotationsListenerMiddleware.startListening({
  matcher: iiifApi.endpoints.getAnnotation.matchRejected,
  effect: (action, listenerApi) => {
    const { targetId, annotationId } = action.meta.arg.originalArgs;
    listenerApi.dispatch(receiveAnnotationFailure(targetId, annotationId, action.error?.data ?? action.error));
  },
});
