import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { ErrorDialog } from '../components/ErrorDialog';
import * as actions from '../state/actions';
import { getLatestErrorToConfirm } from '../state/selectors';

/**
 * mapStateToProps - to hook up connect
 * @memberof ErrorDialog
 * @private
 */
const mapStateToProps = state => ({
  error: getLatestErrorToConfirm(state),
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof App
 * @private
 */
const mapDispatchToProps = {
  confirmError: actions.confirmError,
};

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('ErrorDialog'),
);

export default enhance(ErrorDialog);
