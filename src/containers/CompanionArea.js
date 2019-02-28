import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend';
import { getCompanionWindowsOfWindow, getCompanionAreaVisibility, getWindow } from '../state/selectors/windows';
import * as actions from '../state/actions';
import { CompanionArea } from '../components/CompanionArea';

/** */
const mapStateToProps = (state, { windowId, position }) => ({
  companionAreaOpen: getCompanionAreaVisibility(state, { position, windowId }),
  companionWindows: getCompanionWindowsOfWindow(state, { windowId })
    .filter(cw => cw.position === position),
  sideBarOpen: getWindow(state, { windowId }).sideBarOpen,
});

const mapDispatchToProps = ({
  setCompanionAreaOpen: actions.setCompanionAreaOpen,
});

/** */
const styles = theme => ({
  horizontal: {
    flexDirection: 'column',
    width: '100%',
  },
  root: {
    display: 'flex',
    minHeight: 0,
    position: 'relative',
  },
  toggle: {
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.darkened[theme.palette.type]}`,
    borderRadius: 0,
    height: '48px',
    left: '100%',
    marginTop: '1rem',
    padding: 2,
    position: 'absolute',
    width: '23px',
    zIndex: theme.zIndex.drawer,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('CompanionArea'),
);

export default enhance(CompanionArea);
