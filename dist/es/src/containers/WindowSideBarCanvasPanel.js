import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { WindowSideBarCanvasPanel } from '../components/WindowSideBarCanvasPanel';
import { getCompanionWindow, getDefaultSidebarVariant, getSequenceTreeStructure, getWindow, getManifestoInstance, getSequence, getSequences } from '../state/selectors';
/**
 * mapStateToProps - to hook up connect
 */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id,
      windowId = _ref.windowId;
  var treeStructure = getSequenceTreeStructure(state, {
    windowId: windowId
  });
  var window = getWindow(state, {
    windowId: windowId
  });
  var config = state.config;
  var companionWindow = getCompanionWindow(state, {
    companionWindowId: id
  });
  var collectionPath = window.collectionPath || [];
  var collectionId = collectionPath && collectionPath[collectionPath.length - 1];
  var sequence = getSequence(state, {
    windowId: windowId
  });
  return {
    collection: collectionId && getManifestoInstance(state, {
      manifestId: collectionId
    }),
    config: config,
    sequenceId: sequence && sequence.id,
    sequences: getSequences(state, {
      windowId: windowId
    }),
    showToc: treeStructure && treeStructure.nodes && treeStructure.nodes.length > 0,
    variant: companionWindow.variant || getDefaultSidebarVariant(state, {
      windowId: windowId
    })
  };
};
/**
 * mapStateToProps - used to hook up connect to state
 * @memberof WindowSideBarCanvasPanel
 * @private
 */


var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var id = _ref2.id,
      windowId = _ref2.windowId;
  return {
    showMultipart: function showMultipart() {
      return dispatch(actions.addOrUpdateCompanionWindow(windowId, {
        content: 'collection',
        position: 'right'
      }));
    },
    updateSequence: function updateSequence(sequenceId) {
      return dispatch(actions.updateWindow(windowId, {
        sequenceId: sequenceId
      }));
    },
    updateVariant: function updateVariant(variant) {
      return dispatch(actions.updateCompanionWindow(windowId, id, {
        variant: variant
      }));
    }
  };
};
/**
 *
 * @param theme
 */


var styles = function styles(theme) {
  return {
    "break": {
      flexBasis: '100%',
      height: 0
    },
    collectionNavigationButton: {
      textTransform: 'none'
    },
    label: {
      paddingLeft: theme.spacing(1)
    },
    select: {
      '&:focus': {
        backgroundColor: theme.palette.background.paper
      }
    },
    selectEmpty: {
      backgroundColor: theme.palette.background.paper
    },
    variantTab: {
      minWidth: 'auto'
    }
  };
};

var enhance = compose(withTranslation(), withStyles(styles), connect(mapStateToProps, mapDispatchToProps), withPlugins('WindowSideBarCanvasPanel'));
export default enhance(WindowSideBarCanvasPanel);