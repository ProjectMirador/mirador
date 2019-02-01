import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../state/actions';
import Window from '../components/Window';


/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = (dispatch, props) => ({
  updateWindowPosition: (position) => {
    dispatch(
      actions.updateWindowPosition(props.window.id, position),
    );
  },
  setWindowSize: size => dispatch(
    actions.setWindowSize(props.window.id, size),
  ),
});

/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */
const mapStateToProps = ({ manifests }, props) => ({
  manifest: manifests[props.window.manifestId],
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  // further HOC go here
);

export default enhance(Window);
