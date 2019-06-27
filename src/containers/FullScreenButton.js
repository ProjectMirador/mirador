import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getFullScreenEnabled } from '../state/selectors';
import { FullScreenButton } from '../components/FullScreenButton';

/**
 * mapStateToProps - to hook up connect
 * @memberof FullScreenButton
 * @private
 */
const mapStateToProps = state => ({
  isFullscreenEnabled: getFullScreenEnabled(state),
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = { setWorkspaceFullscreen: actions.setWorkspaceFullscreen };

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('FullScreenButton'),
);

export default enhance(FullScreenButton);
