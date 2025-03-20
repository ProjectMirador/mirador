import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getWindowConfig } from '../state/selectors';
import { WindowTopBarMenu } from '../components/WindowTopBarMenu';

/** mapStateToProps */
const mapStateToProps = (state, { windowId }) => {
  const config = getWindowConfig(state, { windowId });

  return {
    allowClose: config.allowClose,
    allowFullscreen: config.allowFullscreen,
    allowMaximize: config.allowMaximize,
    allowTopMenuButton: config.allowTopMenuButton,
    maximized: config.maximized,
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  maximizeWindow: () => dispatch(actions.maximizeWindow(windowId)),
  minimizeWindow: () => dispatch(actions.minimizeWindow(windowId)),
  removeWindow: () => dispatch(actions.removeWindow(windowId)),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  withPlugins('WindowTopBarMenu'),
);

export default enhance(WindowTopBarMenu);
