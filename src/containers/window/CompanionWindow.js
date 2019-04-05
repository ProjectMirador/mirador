import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../../extend';
import * as actions from '../../state/actions';
import { getCompanionWindow } from '../../state/selectors';
import { CompanionWindow } from '../../components/window/CompanionWindow';

/**
 * mapStateToProps - to hook up connect
 * @memberof CompanionWindow
 * @private
 */
const mapStateToProps = (state, { id, windowId }) => {
  const companionWindow = getCompanionWindow(state, { companionWindowId: id });

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
const mapDispatchToProps = (dispatch, { windowId, id }) => ({
  onCloseClick: () => dispatch(
    actions.removeCompanionWindow(windowId, id),
  ),
  updateCompanionWindow: (...args) => dispatch(actions.updateCompanionWindow(...args)),
});

/**
 *
 * @param theme
 * @returns {{closeButton: {top: number, position: string, right: number},
 * root: {overflowY: string, width: string}}}
 */
const styles = theme => ({
  'companionWindow-bottom': {
    borderTop: '0.5px solid rgba(0, 0, 0, 0.12)',
  },
  'companionWindow-left': {

  },
  'companionWindow-right': {
    borderLeft: '0.5px solid rgba(0, 0, 0, 0.12)',
  },

  content: {
    overflowY: 'auto',
  },
  horizontal: {
    height: '201px',
    width: '100%',
  },
  leftPadding: {
    paddingLeft: theme.spacing.unit * 2,
  },
  positionButton: {
    order: -100,
  },
  root: {
    boxShadow: 'none',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  },
  toolbar: {
    minHeight: 'max-content',
  },
  vertical: {
    width: '235px',
  },
  windowSideBarTitle: {
    ...theme.typography.subtitle1,
    flexGrow: 1,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('CompanionWindow'),
);

export default enhance(CompanionWindow);
