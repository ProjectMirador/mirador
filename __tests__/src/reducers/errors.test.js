
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

    const expected = {
      id: errorId,
      message: errorMessage,
    };

    const ret = errorsReducer(undefined, {
      id: errorId,
      payload: {
        ...error,
      },
      type: ActionTypes.ADD_ERROR,

    });
    expect(ret.items).toEqual([error.id]);
    expect(ret).toHaveProperty(error.id);
    expect(ret[error.id]).toEqual(expected);
  });

  it('should handle CONFIRM_ERROR', () => {
    const stateBefore = {
      [errorId]: {
        id: errorId,
        message: errorMessage,
      },
      items: [errorId],
    };

    const expected = {
      ...stateBefore,
      [errorId]: {
        ...stateBefore[errorId], showDialog: false,
      },
    };

    /*
      Only the 'showDialog' property is set to false. The error itself remains part of the state,
      so we are able to provide an error history or some kind of logs later on
    */
    expect(errorsReducer(stateBefore, {
      id: errorId,
      type: ActionTypes.CONFIRM_ERROR,
    })).toEqual(expected);
  });
  it('should handle IMPORT_MIRADOR_STATE setting default state', () => {
    expect(errorsReducer({}, {
      state: { errors: { new: 'stuff' } },
      type: ActionTypes.IMPORT_MIRADOR_STATE,
    })).toEqual({ items: [] });
  });
});
