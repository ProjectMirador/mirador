
import { errorsReducer } from '../../../src/state/reducers/errors';
import ActionTypes from '../../../src/state/actions/action-types';

describe('ADD_ERROR', () => {
  const errorMessage = 'testErrorMessage';
  const errorId = 'errorId123';

  it('should handle ADD_ERROR', () => {
    const error = {
      id: errorId,
      message: errorMessage,
    };
    const ret = errorsReducer(undefined, {
      type: ActionTypes.ADD_ERROR,
      ...error,

    });
    expect(ret.items).toEqual([error.id]);
    expect(ret).toHaveProperty(error.id);
    expect(ret[error.id]).toEqual(error);
  });

  it('should handle REMOVE_ERROR', () => {
    const stateBefore = {
      errorId: {
        id: errorId,
        message: errorMessage,
      },
      items: [errorId],
    };

    /*
      Only the id is removed from the 'items' array. The error itself remains part of the state,
      so we are able to provide an error history or some kind of logs later on
    */
    expect(errorsReducer(stateBefore, {
      id: errorId,
      type: ActionTypes.REMOVE_ERROR,
    })).toHaveProperty('items', []);
  });
});
