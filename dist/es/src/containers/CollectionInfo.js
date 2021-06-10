import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { getManifestTitle, getWindow } from '../state/selectors';
import * as actions from '../state/actions';
import { CollectionInfo } from '../components/CollectionInfo';
/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarInfoPanel
 * @private
 */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id,
      windowId = _ref.windowId;

  var _ref2 = getWindow(state, {
    windowId: windowId
  }) || {},
      collectionPath = _ref2.collectionPath;

  var manifestId = collectionPath[collectionPath.length - 1];
  return {
    collectionLabel: getManifestTitle(state, {
      manifestId: manifestId
    }),
    collectionPath: collectionPath
  };
};

var mapDispatchToProps = {
  showCollectionDialog: actions.showCollectionDialog
};
var enhance = compose(withTranslation(), connect(mapStateToProps, mapDispatchToProps), withPlugins('CollectionInfo'));
export default enhance(CollectionInfo);