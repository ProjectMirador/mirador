import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend/withPlugins';
import { WorkspaceImport } from '../components/WorkspaceImport';
import * as actions from '../state/actions';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof App
 * @private
 */
const mapDispatchToProps = {
  addError: actions.addError,
  importConfig: actions.importMiradorState,
};

/** */
const styles = theme => ({
  hint: {
    maxWidth: '400px',
  },
  textField: {
    width: '400px',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(null, mapDispatchToProps),
  withPlugins('WorkspaceImport'),
);

export default enhance(WorkspaceImport);
