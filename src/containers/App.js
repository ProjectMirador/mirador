import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../state/actions';
import App from '../components/App';

/**
 * mapStateToProps - to hook up connect
 * @memberof App
 * @private
 */
const mapStateToProps = state => (
  {
    workspace: state.workspace,
    manifests: state.manifests,
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof App
 * @private
 */
const mapDispatchToProps = {
  fetchManifest: actions.fetchManifest,
  fullscreenWorkspace: actions.fullscreenWorkspace,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  // further HOC go here
);

export default enhance(App);
