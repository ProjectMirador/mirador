import { compose } from 'redux';
import { connect } from 'react-redux';
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

const enhance = compose(
  connect(mapStateToProps, null),
  miradorWithPlugins,
  // further HOC
);

export default enhance(CompanionWindow);
