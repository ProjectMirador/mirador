import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend';
import ErrorDialog from '../components/ErrorDialog';
import * as actions from '../state/actions';
import { getLatestError } from '../state/selectors';

/**
 * mapStateToProps - to hook up connect
 * @memberof ErrorDialog
 * @private
 */
const mapStateToProps = state => ({
  error: getLatestError(state),
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof App
 * @private
 */
const mapDispatchToProps = {
  addError: actions.addError,
  removeError: actions.removeError,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  withPlugins('ErrorDialog'),
);

export default enhance(ErrorDialog);
