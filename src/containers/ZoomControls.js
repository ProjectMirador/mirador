import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getViewer } from '../state/selectors';
import { ZoomControls } from '../components/ZoomControls';
import { withWindowContext } from '../contexts/WindowContext';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = (state, { windowId }) => (
  {
    viewer: getViewer(state, { windowId }),
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
const mapDispatchToProps = { updateViewport: actions.updateViewport };

const enhance = compose(
  withWindowContext,
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('ZoomControls'),
);

export default enhance(ZoomControls);
