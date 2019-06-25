import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../../src/state/selectors', () => ({
  getCanvas: (state, { canvasIndex }) => ({ id: `canvasId-${canvasIndex}` }),
  getSearchAnnotationsForWindow: () => ([{
    resources: [
      { id: 'annoId', targetId: 'canvasId-5' },
    ],
  }]),
}));

describe('canvas actions', () => {
  describe('setCanvas', () => {
    let store = null;
    beforeEach(() => {
      store = mockStore({});
    });

    it('sets to a defined canvas', () => {
      const id = 'abc123';
      const expectedAction = {
        canvasIndex: 100,
        type: ActionTypes.SET_CANVAS,
        windowId: id,
      };
      store.dispatch(actions.setCanvas(id, 100));
      expect(store.getActions()[0]).toEqual(expectedAction);
    });

    it('updates the currently selected search to something on that canvas', () => {
      const id = 'abc123';
      const expectedAction = {
        canvasIndex: 5,
        selectedContentSearchAnnotation: ['annoId'],
        type: ActionTypes.SET_CANVAS,
        windowId: id,
      };
      store.dispatch(actions.setCanvas(id, 5));
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });
  describe('updateViewport', () => {
    it('sets viewer state', () => {
      const id = 'abc123';
      const expectedAction = {
        payload: {
          x: 1,
          y: 0,
          zoom: 0.5,
        },
        type: ActionTypes.UPDATE_VIEWPORT,
        windowId: id,
      };
      expect(actions.updateViewport(id, { x: 1, y: 0, zoom: 0.5 })).toEqual(expectedAction);
    });
  });
});
