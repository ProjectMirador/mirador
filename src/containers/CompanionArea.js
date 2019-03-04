import { compose } from 'redux';
import { connect } from 'react-redux';
import { getCompanionWindowsOfWindow } from '../state/selectors';
import { CompanionArea } from '../components/CompanionArea';

/** */
const mapStateToProps = (state, { windowId, position }) => ({
  companionWindows: getCompanionWindowsOfWindow(state, windowId)
    .filter(cw => cw.position === position),
});

const enhance = compose(
  connect(mapStateToProps),
);

export default enhance(CompanionArea);
