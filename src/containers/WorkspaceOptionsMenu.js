import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { getContainerId } from '../state/selectors';
import { WorkspaceOptionsMenu } from '../components/WorkspaceOptionsMenu';

/** Used for connect */
const mapStateToProps = state => ({
  containerId: getContainerId(state),
});

// containerId: getContainerId(state),/
const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, null),
);

export default enhance(WorkspaceOptionsMenu);
