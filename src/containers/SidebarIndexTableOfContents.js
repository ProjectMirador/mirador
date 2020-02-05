import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { SidebarIndexTableOfContents } from '../components/SidebarIndexTableOfContents';
import {
  getManifestoInstance,
  getManifestTreeStructure,
  getVisibleCanvases,
  getVisibleRangeIds,
} from '../state/selectors';
import * as actions from '../state/actions';


/**
 * mapStateToProps - to hook up connect
 */
const mapStateToProps = (state, { id, windowId }) => ({
  canvases: getVisibleCanvases(state, { windowId }),
  manifesto: getManifestoInstance(state, { windowId }),
  treeStructure: getManifestTreeStructure(state, { windowId }),
  visibleRangeIds: getVisibleRangeIds(state, { windowId }),
});

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SidebarIndexTableOfContents
 * @private
 */
const mapDispatchToProps = (dispatch, { id, windowId }) => ({
  setCanvas: (...args) => dispatch(actions.setCanvas(...args)),
});

/**
 * Styles for withStyles HOC
 */
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('SidebarIndexTableOfContents'),
);

export default enhance(SidebarIndexTableOfContents);
