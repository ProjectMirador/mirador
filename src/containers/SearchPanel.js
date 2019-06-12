import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../state/actions';
import { withPlugins } from '../extend/withPlugins';
import { SearchPanel } from '../components/SearchPanel';

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
  connect(null, mapDispatchToProps),
  withStyles(styles),
  withTranslation(),
  withPlugins('SearchPanel'),
);

export default enhance(SearchPanel);
