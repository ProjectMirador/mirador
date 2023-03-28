import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import {
  getManifestoInstance, getVisibleCanvasAudioResources, getVisibleCanvasVideoResources, getWindow,
} from '../state/selectors';
import { PrimaryWindow } from '../components/PrimaryWindow';
import { withWindowContext } from '../contexts/WindowContext';

/** */
const mapStateToProps = (state, { windowId }) => {
  const manifestoInstance = getManifestoInstance(state, { windowId });
  return {
    audioResources: getVisibleCanvasAudioResources(state, { windowId }) || [],
    isCollection: manifestoInstance && manifestoInstance.isCollection(),
    isCollectionDialogVisible: getWindow(state, { windowId }).collectionDialogOn,
    videoResources: getVisibleCanvasVideoResources(state, { windowId }) || [],
  };
};

const enhance = compose(
  withWindowContext,
  connect(mapStateToProps, null),
  withPlugins('PrimaryWindow'),
);

export default enhance(PrimaryWindow);
