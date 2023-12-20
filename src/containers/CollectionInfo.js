import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import {
  getManifestTitle,
  getWindow,
} from '../state/selectors';
import * as actions from '../state/actions';
import { CollectionInfo } from '../components/CollectionInfo';
import { withWindowContext } from '../contexts/WindowContext';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarInfoPanel
 * @private
 */
const mapStateToProps = (state, { id, windowId }) => {
  const { collectionPath } = (getWindow(state, { windowId }) || {});
  const manifestId = collectionPath[collectionPath.length - 1];

  return {
    collectionLabel: getManifestTitle(state, { manifestId }),
    collectionPath,
  };
};

const mapDispatchToProps = {
  showCollectionDialog: actions.showCollectionDialog,
};

const enhance = compose(
  withTranslation(),
  withWindowContext,
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('CollectionInfo'),
);

export default enhance(CollectionInfo);
