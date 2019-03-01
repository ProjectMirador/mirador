import { compose } from 'redux';
import { connect } from 'react-redux';
import { Window } from '../components/Window';


/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */
const mapStateToProps = ({ manifests, windows, config }, props) => ({
  manifest: manifests[props.window.manifestId],
  window: windows[props.window.id],
  workspaceType: config.workspace.type,
});

const enhance = compose(
  connect(mapStateToProps),
);

export default enhance(Window);
