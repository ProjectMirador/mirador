import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../state/actions';
import { withPlugins } from '../extend/withPlugins';
import { SearchPanel } from '../components/SearchPanel';
import { getManifestSearchService, getSearchQuery, getWindow } from '../state/selectors';

/** */
const mapStateToProps = (state, { id, windowId }) => ({
  query: getSearchQuery(state, { companionWindowId: id, windowId }),
  searchService: getManifestSearchService(state, { windowId }),
  suggestedSearches: getWindow(state, { windowId }).suggestedSearches,
});

/** */
const mapDispatchToProps = (dispatch, props) => ({
  fetchSearch: (searchId, query) => dispatch(
    actions.fetchSearch(props.windowId, props.id, searchId, query),
  ),
  removeSearch: () => dispatch(actions.removeSearch(props.windowId, props.id)),
});

/**
* Styles for withStyles HOC
*/
const styles = theme => ({
  clearChip: {
    marginLeft: theme.spacing(1),
  },
  inlineButton: {
    '& span': {
      lineHeight: '1.5em',
    },
    margin: theme.spacing(2),
    padding: 0,
    textAlign: 'inherit',
    textTransform: 'none',
  },
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withTranslation(),
  withPlugins('SearchPanel'),
);

export default enhance(SearchPanel);
