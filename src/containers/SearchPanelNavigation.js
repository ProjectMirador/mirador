import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { SearchPanelNavigation } from '../components/SearchPanelNavigation';
import * as actions from '../state/actions';
import {
  getSelectedContentSearchAnnotationIds,
  getSearchNumTotal,
  getSortedSearchHitsForCompanionWindow,
  getThemeDirection,
} from '../state/selectors';
import { withWindowContext } from '../contexts/WindowContext';

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SearchPanelControls
 * @private
 */
const mapStateToProps = (state, { companionWindowId, windowId }) => ({
  direction: getThemeDirection(state),
  numTotal: getSearchNumTotal(state, { companionWindowId, windowId }),
  searchHits: getSortedSearchHitsForCompanionWindow(state, { companionWindowId, windowId }),
  selectedContentSearchAnnotation: getSelectedContentSearchAnnotationIds(state, {
    companionWindowId, windowId,
  }),
});

/**
 * mapDispatchToProps - to hook up connect
 * @memberof SearchPanelNavigation
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  selectAnnotation: (...args) => dispatch(
    actions.selectAnnotation(windowId, ...args),
  ),
});

/** */
const styles = theme => ({
  body2: {
    marginLeft: '-16px',
    width: '100%',
  },
});

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  withWindowContext,
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('SearchPanelNavigation'),
);

export default enhance(SearchPanelNavigation);
