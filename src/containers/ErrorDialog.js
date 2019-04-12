import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import {
  first,
  omit,
  values,
} from 'lodash';
import { withPlugins } from '../extend';
import { ErrorDialog } from '../components/ErrorDialog';
import * as actions from '../state/actions';

/**
 * mapStateToProps - to hook up connect
 * @memberof ErrorDialog
 * @private
 */
const mapStateToProps = state => ({
  /* extract 'items' value and get first key-value-pair (an error) */
  errors: first(values(omit(state.errors, 'items'))),
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof App
 * @private
 */
const mapDispatchToProps = {
  removeError: actions.removeError,
};

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('ErrorDialog'),
);

export default enhance(ErrorDialog);
