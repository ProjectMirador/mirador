import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { getCompanionWindowsOfWindow } from '../state/selectors';
import CompanionArea from '../components/CompanionArea';

/** */
const mapStateToProps = (state, { windowId }) => ({
  companionWindows: getCompanionWindowsOfWindow(state, windowId),
});

const styles = {
  rightContainer: {
    flexDirection: 'row-reverse',
    height: '100%',
  },
  rightItem: {
    width: '200px',
    overflowY: 'scroll',
  },
  bottomContainer: {
    flexDirection: 'column-reverse',
  },
  bottomItem: {
    height: '200px',
    overflowY: 'scroll',
  },
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps),
);

export default enhance(CompanionArea);
