import { compose } from 'redux';
import { connect } from 'react-redux';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import OpenSeadragonViewer from '../components/OpenSeadragonViewer';
import * as actions from '../state/actions';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = {
  updateViewport: actions.updateViewport,
};

const enhance = compose(
  connect(null, mapDispatchToProps),
  miradorWithPlugins,
  // further HOC go here
);


export default enhance(OpenSeadragonViewer);
