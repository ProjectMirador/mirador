import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import { WorkspaceImport } from '../components/WorkspaceImport';
import * as actions from '../state/actions';

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
  connect(null, mapDispatchToProps),
  miradorWithPlugins,
  withTranslation(),
  // further HOC go here
);

export default enhance(WorkspaceImport);
