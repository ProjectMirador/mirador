import ThumbnailNavigation from '../containers/ThumbnailNavigation';
import WindowSideBarAnnotationsPanel from '../containers/WindowSideBarAnnotationsPanel';
import WindowSideBarInfoPanel from '../containers/WindowSideBarInfoPanel';
import WindowSideBarCanvasPanel from '../containers/WindowSideBarCanvasPanel';
import AttributionPanel from '../containers/AttributionPanel';
import SearchPanel from '../containers/SearchPanel';
import LayersPanel from '../containers/LayersPanel';
import CustomPanel from '../containers/CustomPanel';

const map = {
  annotations: WindowSideBarAnnotationsPanel,
  attribution: AttributionPanel,
  canvas: WindowSideBarCanvasPanel,
  custom: CustomPanel,
  info: WindowSideBarInfoPanel,
  layers: LayersPanel,
  search: SearchPanel,
  thumbnailNavigation: ThumbnailNavigation,
};

export default map;
