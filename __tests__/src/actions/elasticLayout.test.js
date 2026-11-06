import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';

describe('updateElasticWindowLayout', () => {
  it('returns the appropriate action type from the legacy positional call', () => {
    const id = 'abc123';
    const expectedAction = {
      payload: {
        windowId: id,
        x: 20,
        y: 20,
      },
      type: ActionTypes.UPDATE_ELASTIC_WINDOW_LAYOUT,
    };
    expect(
      actions.updateElasticWindowLayout(id, {
        x: 20,
        y: 20,
      }),
    ).toEqual(expectedAction);
  });

  it('returns the appropriate action type from a single-object call', () => {
    const expectedAction = {
      payload: { windowId: 'abc123', x: 20, y: 20 },
      type: ActionTypes.UPDATE_ELASTIC_WINDOW_LAYOUT,
    };
    expect(actions.updateElasticWindowLayout({ windowId: 'abc123', x: 20, y: 20 })).toEqual(expectedAction);
  });
});
