import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import { ErrorContent } from '../components/ErrorContent';
import {
  getCompanionWindow,
  getManifest,
  getWindow,
  getViewer,
  getConfig,
} from '../state/selectors';
import { withWindowContext } from '../contexts/WindowContext';

/** mapStateToProps */
const mapStateToProps = (state, { companionWindowId, windowId }) => ({
  metadata: {
    companionWindow: companionWindowId && getCompanionWindow(state, { companionWindowId }),
    manifest: getManifest(state, { windowId }),
    viewer: getViewer(state, { windowId }),
    window: getWindow(state, { windowId }),
  },
  showJsError: getConfig(state).window.showJsError,
});

const enhance = compose(
  withWindowContext,
  connect(mapStateToProps),
  withPlugins('ErrorContent'),
);

export default enhance(ErrorContent);
