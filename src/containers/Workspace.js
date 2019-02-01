import { compose } from 'redux';
import { connect } from 'react-redux';
import Workspace from '../components/Workspace';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => (
  {
    config: state.config,
    windows: state.windows,
  }
);

const enhance = compose(
  connect(mapStateToProps),
  // further HOC go here
);

export default enhance(Workspace);
