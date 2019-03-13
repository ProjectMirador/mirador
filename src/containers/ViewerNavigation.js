import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import * as actions from '../state/actions';
import { ViewerNavigation } from '../components/ViewerNavigation';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestForm
 * @private
 */
const mapDispatchToProps = {
  setCanvas: actions.setCanvas,
};

const enhance = compose(
  withTranslation(),
  connect(null, mapDispatchToProps),
  // further HOC go here
);

export default enhance(ViewerNavigation);
