import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getAllowedWindowViewTypes, getWindowConfig, getWindowViewType } from '../state/selectors';
import { WindowViewSettings } from '../components/WindowViewSettings';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  setShiftBookView: (doShift) => dispatch(actions.shiftBookView(windowId, doShift)),
  setWindowViewType: (viewType) => dispatch(actions.setWindowViewType(windowId, viewType)),
});

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = (state, { windowId }) => (
  {
    viewTypes: getAllowedWindowViewTypes(state, { windowId }),
    windowViewType: getWindowViewType(state, { windowId }),
    shiftBookView: getWindowConfig(state, { windowId }).shiftBookView ?? false,
  }
);

/** */
const styles = theme => ({
  label: {
    borderBottom: '2px solid transparent',
  },
  MenuItem: {
    display: 'inline-block',
  },
  selectedLabel: {
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
  },
  shiftToggle: {
    flexDirection: 'column',
    whiteSpace: 'break-spaces',
    marginLeft: '16px',
  },
  shiftToggleIcon: {
    height: '18px',
    width: 'auto',
  }
});

const enhance = compose(
  withStyles(styles),
  withTranslation(null, { withRef: true }),
  connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true }),
  withPlugins('WindowViewSettings'),
);

export default enhance(WindowViewSettings);
