import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getCompanionWindow, getManifest, getManifestoInstance, getDefaultSidebarVariant, getWindow } from '../state/selectors';
import { WindowSideBarCollectionPanel } from '../components/WindowSideBarCollectionPanel';
/**
 * mapStateToProps - to hook up connect
 */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id,
      windowId = _ref.windowId;
  var window = getWindow(state, {
    windowId: windowId
  });
  var companionWindow = getCompanionWindow(state, {
    companionWindowId: id
  });
  var localCollectionPath = companionWindow.collectionPath;
  var collectionPath = localCollectionPath || window.collectionPath;
  var collectionId = collectionPath && collectionPath[collectionPath.length - 1];
  var parentCollectionId = collectionPath && collectionPath[collectionPath.length - 2];
  var collection = collectionId && getManifest(state, {
    manifestId: collectionId
  });
  var parentCollection = parentCollectionId && getManifest(state, {
    manifestId: parentCollectionId
  });
  var manifest = getManifest(state, {
    windowId: windowId
  });
  return {
    canvasNavigation: state.config.canvasNavigation,
    collection: collection && getManifestoInstance(state, {
      manifestId: collection.id
    }),
    collectionId: collectionId,
    collectionPath: collectionPath,
    error: collection && collection.error,
    isFetching: collection && collection.isFetching,
    manifestId: manifest && manifest.id,
    parentCollection: parentCollection && getManifestoInstance(state, {
      manifestId: parentCollection.id
    }),
    ready: collection && !!collection.json,
    variant: companionWindow.variant || getDefaultSidebarVariant(state, {
      windowId: windowId
    })
  };
};
/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SidebarIndexList
 * @private
 */


var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var id = _ref2.id,
      windowId = _ref2.windowId;
  return {
    updateCompanionWindow: function updateCompanionWindow() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return dispatch(actions.updateCompanionWindow.apply(actions, [windowId, id].concat(args)));
    },
    updateWindow: function updateWindow() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return dispatch(actions.updateWindow.apply(actions, [windowId].concat(args)));
    }
  };
};
/**
 * Styles for withStyles HOC
 */


var styles = function styles(theme) {
  return {
    label: {
      paddingLeft: theme.spacing(1)
    },
    menuItem: {
      borderBottom: "0.5px solid ".concat(theme.palette.divider),
      paddingRight: theme.spacing(1),
      whiteSpace: 'normal'
    }
  };
};

var enhance = compose(withStyles(styles), withTranslation(), connect(mapStateToProps, mapDispatchToProps), withPlugins('WindowSideBarCollectionPanel'));
export default enhance(WindowSideBarCollectionPanel);