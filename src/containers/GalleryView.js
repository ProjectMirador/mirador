import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../state/actions';
import { withPlugins } from '../extend';
import { GalleryView } from '../components/GalleryView';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = state => (
  {}
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof WindowViewer
 * @private
 */
const mapDispatchToProps = {
  setCanvas: actions.setCanvas,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('GalleryView'),
  // further HOC go here
);

export default enhance(GalleryView);
