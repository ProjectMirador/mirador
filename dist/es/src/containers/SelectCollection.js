import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../state/actions';
import { withPlugins } from '../extend/withPlugins';
import { getWindow } from '../state/selectors';
import { SelectCollection } from '../components/SelectCollection';
/** */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;

  var _ref2 = getWindow(state, {
    windowId: windowId
  }) || {},
      collectionPath = _ref2.collectionPath,
      manifestId = _ref2.manifestId;

  return {
    collectionPath: collectionPath,
    manifestId: manifestId
  };
};

var mapDispatchToProps = {
  showCollectionDialog: actions.showCollectionDialog
};
/** */

var styles = function styles(theme) {
  return {};
};

var enhance = compose(withTranslation(), withStyles(styles), connect(mapStateToProps, mapDispatchToProps), withPlugins('SelectCollection'));
export default enhance(SelectCollection);