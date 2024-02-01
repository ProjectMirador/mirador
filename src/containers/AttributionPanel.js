import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import {
  getManifestLogo,
  getRequiredStatement,
  getRights,
} from '../state/selectors';
import { withPlugins } from '../extend/withPlugins';
import { AttributionPanel } from '../components/AttributionPanel';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarInfoPanel
 * @private
 */
const mapStateToProps = (state, { id, windowId }) => ({
  manifestLogo: getManifestLogo(state, { windowId }),
  requiredStatement: getRequiredStatement(state, { windowId }),
  rights: getRights(state, { windowId }),
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps),
  withPlugins('AttributionPanel'),
);

export default enhance(AttributionPanel);
