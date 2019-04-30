import {
  getErrorsToConfirm,
  getLatestError,
  getLatestErrorToConfirm,
} from '../../../src/state/selectors';

describe('getLatestError', () => {
  it('returns the error that was added most recently', () => {
    const errors = {
      items: ['testabc3', 'testabc1', 'testabc2'],
      testabc1: { id: 'testabc1', message: 'testMessag01', showDailog: true },
      testabc3: { id: 'testabc3', message: 'testMessage03' },
      // eslint-disable-next-line sort-keys
      testabc2: { id: 'testabc2', message: 'testMessage02' },
    };
    const expected = { id: 'testabc3', message: 'testMessage03' };

    expect(getLatestError({ errors })).toEqual(expected);
  });
});

describe('getErrorsToConfirm', () => {
  it('returns all errors containing showDialog=true', () => {
    const errors = {
      items: ['testabc1', 'testabc2', 'testabc5'],
      testabc1: { id: 'testabc1', message: 'testMessag01', showDialog: true },
      testabc2: { id: 'testabc2', message: 'testMessage02' },
      testabc3: { id: 'testabc3', message: 'testMessage03' },
      testabc4: { id: 'testabc4', message: 'testMessage04', showDialog: true },
      testabc5: { id: 'testabc5', message: 'testMessage05', showDialog: true },
    };
    const expected = [{ ...errors.testabc1 }, { ...errors.testabc5 }];
    expect(getErrorsToConfirm({ errors })).toEqual(expected);
  });
});

describe('getLatestErrorToConfirm', () => {
  it('returns the latest error containing showDialog=true', () => {
    const errors = {
      items: ['testabc5', 'testabc3', 'testabc4', 'testabc2'],
      testabc2: { id: 'testabc2', message: 'testMessage02' },
      testabc3: { id: 'testabc3', message: 'testMessage03' },
      testabc4: { id: 'testabc4', message: 'testMessage04', showDialog: true },
      testabc5: { id: 'testabc5', message: 'testMessage05', showDialog: true },
    };
    const expected = { ...errors.testabc5 };
    expect(getLatestErrorToConfirm({ errors })).toEqual(expected);
  });
});
