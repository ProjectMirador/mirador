import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import * as actions from '../state/actions';
import WorkspaceAdd from '../components/WorkspaceAdd';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => ({ manifests: state.manifests });

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
const mapDispatchToProps = { setWorkspaceAddVisibility: actions.setWorkspaceAddVisibility };

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNamespaces(),
  // further HOC go here
);

export default enhance(WorkspaceAdd);
