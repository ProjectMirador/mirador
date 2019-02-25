import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import * as actions from '../state/actions';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import { CompanionWindow } from '../components/CompanionWindow';

/**
 * mapStateToProps - to hook up connect
 * @memberof CompanionWindow
 * @private
 */
const mapStateToProps = (state, { id }) => {
  const companionWindow = state.companionWindows[id];

  return { ...companionWindow };
};

/**
 * mapDispatchToProps - to hook up connect
 * @memberof CompanionWindow
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId, id }) => ({
  onCloseClick: () => dispatch(actions.closeCompanionWindow(windowId, id)),
  toggleAreaOfCompanionWindow: () => dispatch(actions.toggleAreaOfCompanionWindow(id)),
});

/**
 *
 * @param theme
 * @returns {{closeButton: {top: number, position: string, right: number},
 * root: {overflowY: string, width: string}}}
 */
const styles = theme => ({
  content: {
    ...theme.mixins.gutters(),
  },
  navigation: {
    position: 'sticky',
    top: '0',
    background: 'white',
    zIndex: 5,
  },
});

const enhance = compose(
  withNamespaces(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  miradorWithPlugins,
);

export default enhance(CompanionWindow);
