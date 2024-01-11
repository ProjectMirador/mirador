import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { getLanguagesFromConfigWithCurrent } from '../state/selectors';
import { LocalePicker } from '../components/LocalePicker';

/**
 * Map state to props for connect
 */
const mapStateToProps = state => ({
  languages: getLanguagesFromConfigWithCurrent(state),
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps),
  withPlugins('LocalePicker'),
);

export default enhance(LocalePicker);
