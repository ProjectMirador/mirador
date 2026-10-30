import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';

describe('infoResponse actions', () => {
  describe('removeInfoResponse', () => {
    it('removes an existing infoResponse', () => {
      const expectedAction = {
        infoId: 'foo',
        type: ActionTypes.REMOVE_INFO_RESPONSE,
      };
      expect(actions.removeInfoResponse('foo')).toEqual(expectedAction);
    });
  });
});
