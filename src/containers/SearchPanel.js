import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { SearchPanel } from '../components/SearchPanel';

const enhance = compose(
  connect(null, null),
  withStyles({}),
  withTranslation(),
  withPlugins('SearchPanel'),
);

export default enhance(SearchPanel);
