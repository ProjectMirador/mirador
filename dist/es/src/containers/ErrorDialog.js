import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { ErrorDialog } from '../components/ErrorDialog';
import * as actions from '../state/actions';
import { getLatestError } from '../state/selectors';
/**
 * mapStateToProps - to hook up connect
 * @memberof ErrorDialog
 * @private
 */

var mapStateToProps = function mapStateToProps(state) {
  return {
    error: getLatestError(state)
  };
};
/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof App
 * @private
 */


var mapDispatchToProps = {
  removeError: actions.removeError
};
var enhance = compose(withTranslation(), connect(mapStateToProps, mapDispatchToProps), withPlugins('ErrorDialog'));
export default enhance(ErrorDialog);