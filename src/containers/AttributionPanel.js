import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  getManifestLogo,
  getRequiredStatement,
  getRights,
} from '../state/selectors';
import { withPlugins } from '../extend/withPlugins';
import { AttributionPanel } from '../components/AttributionPanel';
import { withWindowContext } from '../contexts/WindowContext';

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
  withWindowContext,
  connect(mapStateToProps),
  withPlugins('AttributionPanel'),
);

export default enhance(AttributionPanel);
