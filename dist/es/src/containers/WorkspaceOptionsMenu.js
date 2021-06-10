import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { getContainerId } from '../state/selectors';
import { WorkspaceOptionsMenu } from '../components/WorkspaceOptionsMenu';
/** Used for connect */

var mapStateToProps = function mapStateToProps(state) {
  return {
    containerId: getContainerId(state)
  };
}; // containerId: getContainerId(state),/


var enhance = compose(withTranslation(), connect(mapStateToProps, null));
export default enhance(WorkspaceOptionsMenu);