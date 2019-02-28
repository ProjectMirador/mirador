import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend';
import WorkspaceImport from '../components/WorkspaceImport';
import * as actions from '../state/actions';

/**
 * mapStateToProps - to hook up connect
 * @memberof WorkspaceImport
 * @private
 */
const mapStateToProps = state => ({ state });

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof App
 * @private
 */
const mapDispatchToProps = {
  addError: actions.addError,
  importConfig: actions.importWorkspace,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  withPlugins('WorkspaceImport'),
);

export default enhance(WorkspaceImport);
