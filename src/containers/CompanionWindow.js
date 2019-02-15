import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import * as actions from '../state/actions';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import { getCompanionWindowForPosition } from '../state/selectors';
import CompanionWindow from '../components/CompanionWindow';

/**
 * mapStateToProps - to hook up connect
 * @memberof CompanionWindow
 * @private
 */
const mapStateToProps = (state, { windowId, position }) => {
  const companionWindowForPosition = getCompanionWindowForPosition(state, windowId, position);

  return {
    isDisplayed: (companionWindowForPosition
                  && companionWindowForPosition.length > 0),
    panelContent: companionWindowForPosition,
  };
};

/**
 * mapDispatchToProps - to hook up connect
 * @memberof CompanionWindow
 * @private
 */
const mapDispatchToProps = {
  closeCompanionWindow: actions.setWindowCompanionWindow,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  miradorWithPlugins,
  withNamespaces(),
  // further HOC
);

export default enhance(CompanionWindow);
