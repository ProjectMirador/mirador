import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { SearchResults } from '../components/SearchResults';
import * as actions from '../state/actions';
import {
  getSearchHitsForCompanionWindow,
  getSelectedContentSearchAnnotationIds,
} from '../state/selectors';

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SearchResult
 * @private
 */
const mapStateToProps = (state, { companionWindowId, windowId }) => ({
  searchHits: getSearchHitsForCompanionWindow(state, { companionWindowId, windowId }),
  selectedContentSearchAnnotation: getSelectedContentSearchAnnotationIds(state, { windowId }),
});

const mapDispatchToProps = {
  selectContentSearchAnnotation: actions.selectContentSearchAnnotation,
};

/** */
const styles = theme => ({
  focused: {},
  inlineButton: {
    margin: 0,
    padding: 0,
    textDecoration: 'underline',
    textTransform: 'none',
  },
  listItem: {
    '&$selected': {
      '&$focused': {
        '&:hover': {
          backgroundColor: 'inherit',
        },
        backgroundColor: 'inherit',
      },
    },
  },
  navigation: {
    textTransform: 'none',
  },
  selected: {},
  toggleFocus: {
    ...theme.typography.subtitle1,
  },
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withTranslation(),
  withPlugins('SearchResults'),
);

export default enhance(SearchResults);
