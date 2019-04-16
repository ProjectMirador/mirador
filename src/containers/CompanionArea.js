import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { getCompanionWindowsForPosition, getCompanionAreaVisibility, getWindow } from '../state/selectors';
import * as actions from '../state/actions';
import { CompanionArea } from '../components/CompanionArea';

/** */
const mapStateToProps = (state, { windowId, position }) => ({
  companionAreaOpen: getCompanionAreaVisibility(state, { position, windowId }),
  companionWindowIds: getCompanionWindowsForPosition(state, { position, windowId }).map(w => w.id),
  sideBarOpen: (getWindow(state, { windowId }) || {}).sideBarOpen,
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
  left: {
    width: 235,
  },
  root: {
    display: 'flex',
    minHeight: 0,
    position: 'relative',
    zIndex: theme.zIndex.appBar - 2,
  },
  toggle: {
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.shades[theme.palette.type][0]}`,
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
