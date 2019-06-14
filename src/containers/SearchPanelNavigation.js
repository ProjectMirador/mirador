import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { SearchPanelNavigation } from '../components/SearchPanelNavigation';
import * as actions from '../state/actions';
import {
  getSearchHitsForCompanionWindow,
  getSelectedContentSearchAnnotationIds,
  getSearchForCompanionWindow,
} from '../state/selectors';

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SearchPanelControls
 * @private
 */
const mapStateToProps = (state, { companionWindowId, windowId }) => ({
  searchHits: getSearchHitsForCompanionWindow(state, { companionWindowId, windowId }),
  selectedContentSearchAnnotation: getSelectedContentSearchAnnotationIds(state, { windowId }),
  startIndex: getSearchForCompanionWindow(state, { companionWindowId, windowId }).startIndex,
});

/**
 * mapDispatchToProps - to hook up connect
 * @memberof SearchPanelControls
 * @private
 */
const mapDispatchToProps = {
  selectContentSearchAnnotation: actions.selectContentSearchAnnotation,
};

/** */
const styles = theme => ({
  body2: {
    marginLeft: '-16px',
    width: '100%',
  },
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withTranslation(),
  withPlugins('SearchPanelNavigation'),
);

export default enhance(SearchPanelNavigation);
