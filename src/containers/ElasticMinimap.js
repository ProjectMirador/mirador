import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import * as actions from '../state/actions';
import { ElasticMinimap } from '../components/ElasticMinimap';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = (dispatch, props) => ({
  setWorkspaceViewportPosition: (x, y) => {
    dispatch(
      actions.setWorkspaceViewportPosition(x, y),
    );
  },
});

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = state => ({
  // viewport: state.workspace.viewport,
  // workspaceBoundingBox: state.workspace.viewport,
  workspaceViewport: state.workspace.viewport,
  windows: state.windows,
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  miradorWithPlugins,
);

export default enhance(ElasticMinimap);
