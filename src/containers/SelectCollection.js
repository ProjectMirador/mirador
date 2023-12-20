import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../state/actions';
import { withPlugins } from '../extend/withPlugins';
import {
  getWindow,
} from '../state/selectors';
import { SelectCollection } from '../components/SelectCollection';
import { withWindowContext } from '../contexts/WindowContext';

/** */
const mapStateToProps = (state, { windowId }) => {
  const { collectionPath, manifestId } = (getWindow(state, { windowId }) || {});

  return {
    collectionPath,
    manifestId,
  };
};

const mapDispatchToProps = {
  showCollectionDialog: actions.showCollectionDialog,
};
/** */
const styles = (theme) => ({
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  withWindowContext,
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('SelectCollection'),
);

export default enhance(SelectCollection);
