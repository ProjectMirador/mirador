import { compose } from 'redux';
import { connect } from 'react-redux';
import Window from '../components/Window';


/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */
const mapStateToProps = ({ config, manifests, windows }, props) => ({
  manifest: manifests[props.window.manifestId],
  window: windows[props.window.id],
});

const enhance = compose(
  connect(mapStateToProps),
  // further HOC go here
);

export default enhance(Window);
