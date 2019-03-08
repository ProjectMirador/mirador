import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import * as actions from '../state/actions';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import { CompanionWindow } from '../components/CompanionWindow';

/**
 * mapStateToProps - to hook up connect
 * @memberof CompanionWindow
 * @private
 */
const mapStateToProps = (state, { id, windowId }) => {
  const companionWindow = state.companionWindows[id];

  return {
    ...companionWindow,
    isDisplayed: (companionWindow
                  && companionWindow.content
                  && companionWindow.content.length > 0),
  };
};

/**
 * mapDispatchToProps - to hook up connect
 * @memberof CompanionWindow
 * @private
 */
const mapDispatchToProps = {
  onCloseClick: actions.closeCompanionWindow,
  updateCompanionWindow: actions.updateCompanionWindow,
};

/**
 *
 * @param theme
 * @returns {{closeButton: {top: number, position: string, right: number},
 * root: {overflowY: string, width: string}}}
 */
const styles = theme => ({
  windowSideBarTitle: {
    ...theme.typography.subtitle1,
    flexGrow: 1,
  },
  root: {
    display: 'flex',
    minHeight: 0,
    boxShadow: 'none',
    flexDirection: 'column',
  },
  horizontal: {
    height: '200px',
    width: '100%',
  },
  vertical: {
    width: '200px',
  },
  positionButton: {
    order: -100,
  },
  content: {
    ...theme.mixins.gutters(),
    overflowY: 'auto',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  miradorWithPlugins,
);

export default enhance(CompanionWindow);
