import { initViewer } from './init';
import * as actions from './state/actions';
import * as selectors from './state/selectors';

export default {
  viewer: initViewer,
  actions,
  selectors,
};
