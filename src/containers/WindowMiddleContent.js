import { compose } from 'redux';
import { connect } from 'react-redux';
import { getCompanionWindowIds } from '../state/selectors';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import { WindowMiddleContent } from '../components/WindowMiddleContent';

/** */
const mapStateToProps = (state, { window }) => ({
  companionWindowIds: getCompanionWindowIds(state, window.id),
});

const enhance = compose(
  connect(mapStateToProps, null),
  miradorWithPlugins,
  // further HOC go here
);

export default enhance(WindowMiddleContent);
