import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../state/actions';
import { withPlugins } from '../extend/withPlugins';
import { SearchPanel } from '../components/SearchPanel';
import { getSearchResultsForCompanionWindow } from '../state/selectors';

/** */
const mapStateToProps = (state, { id, windowId }) => {
  const results = getSearchResultsForCompanionWindow(state, { companionWindowId: id, windowId });
  return {
    query: results && results.query,
  };
};

/** */
const mapDispatchToProps = (dispatch, props) => ({
  removeSearch: () => dispatch(actions.removeSearch(props.windowId, props.id)),
});

/**
* Styles for withStyles HOC
*/
const styles = theme => ({
  clearChip: {
    marginLeft: theme.spacing(1),
  },
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withTranslation(),
  withPlugins('SearchPanel'),
);

export default enhance(SearchPanel);
