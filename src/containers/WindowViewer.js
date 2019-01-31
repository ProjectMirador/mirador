import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../state/actions';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import WindowViewer from '../components/WindowViewer';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = state => (
  {
    infoResponses: state.infoResponses,
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof WindowViewer
 * @private
 */
const mapDispatchToProps = { fetchInfoResponse: actions.fetchInfoResponse };


const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  miradorWithPlugins,
  // further HOC go here
);

export default enhance(WindowViewer);
