import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withSize } from 'react-sizeme';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getCompanionWindow } from '../state/selectors';
import { CompanionWindow } from '../components/CompanionWindow';

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
  closeButton: {
    order: 4,
  },
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
    wordBreak: 'break-word',
  },
  horizontal: {
  },
  positionButton: {
    marginLeft: -16,
    order: -100,
    width: 24,
  },
  rnd: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  },
  root: {
    boxShadow: 'none',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  },
  small: {},
  titleControls: {
    alignItems: 'center',
    display: 'flex',
    minHeight: 48,
    order: 3,
  },
  toolbar: {
    '&$small': {
      '& $closeButton': {
        order: 'unset',
      },
      '& $titleControls': {
        order: 'unset',
      },
    },
    alignItems: 'flex-start',
    background: theme.palette.shades.light,
    justifyContent: 'space-between',
    minHeight: 'max-content',
    paddingLeft: theme.spacing.unit * 2,
  },
  vertical: {
  },
  windowSideBarTitle: {
    ...theme.typography.subtitle1,
    alignSelf: 'center',
    flexGrow: 1,
    width: 160,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  withSize(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('CompanionWindow'),
);

export default enhance(CompanionWindow);
