import { createSelector } from 'reselect';
import { values } from 'lodash';

/**
 *
 * @param {*} state
 */
const errorSelector = state => (state.errors);

/**
 * returns the latest error
 */
export const getLatestError = createSelector(
  errorSelector,
  (errors) => {
    const eid = errors.items && errors.items[0];
    return errors[eid];
  },
);

/**
 * returns all errors that need to be confirmed
 */
const getErrorObjectsToConfirm = createSelector(
  [errorSelector],
  errors => errors.items
    .filter(item => (
      errors[item].showDialog
    ))
    .map(item => (errors[item])),
);

/**
 * returns all errors that need to be confirmed
 */
export const getErrorsToConfirm = createSelector(
  [getErrorObjectsToConfirm],
  errorObjects => values(errorObjects),
);

/**
 * returns the latest error that needs to be confirmed
 */
export const getLatestErrorToConfirm = createSelector(
  [getErrorObjectsToConfirm],
  errors => errors && errors[0],
);
