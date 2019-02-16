import { compose } from 'redux';
import { connect } from 'react-redux';
import { getCompanionWindowForPosition } from '../state/selectors';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import WindowMiddleContent from '../components/WindowMiddleContent';

/** */
const mapStateToProps = (state, { window }) => {
  const rightCompanionWindow = getCompanionWindowForPosition(state, window.id, 'right');

  return {
    rightCompanionWindowId: rightCompanionWindow && rightCompanionWindow.id,
  };
};

const enhance = compose(
  connect(mapStateToProps, null),
  miradorWithPlugins,
  // further HOC go here
);

export default enhance(WindowMiddleContent);
