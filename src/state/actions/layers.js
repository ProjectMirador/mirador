import { updateLayers as updateLayersSliceAction } from '../slices';
import convertToSliceAction from './convertToSliceAction';

export const updateLayers = convertToSliceAction(updateLayersSliceAction, ['windowId', 'canvasId', 'payload']);
