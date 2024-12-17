import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { MinimalWindow } from '../components/MinimalWindow';
import { getWindowConfig } from '../state/selectors';
import { withWindowContext } from '../contexts/WindowContext';

/** mapStateToProps */
const mapStateToProps = (state, { windowId }) => ({
  allowClose: getWindowConfig(state, { windowId }).allowClose,
  allowWindowSideBar: getWindowConfig(state, { windowId }).allowWindowSideBar,
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  removeWindow: () => dispatch(actions.removeWindow(windowId)),
});

const enhance = compose(
  withWindowContext,
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('MinimalWindow'),
);

export default enhance(MinimalWindow);
