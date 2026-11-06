import { updateElasticWindowLayout as updateElasticWindowLayoutSliceAction } from '../slices';
import convertToSliceAction from './convertToSliceAction';

export const updateElasticWindowLayout = convertToSliceAction(updateElasticWindowLayoutSliceAction, ['windowId', 'payload']);
