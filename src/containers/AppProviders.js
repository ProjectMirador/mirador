import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import { getConfig, getTheme } from '../state/selectors';
import { AppProviders } from '../components/AppProviders';

/**
 * mapStateToProps - to hook up connect
 * @memberof App
 * @private
 */
const mapStateToProps = (state) => {
  const { language, translations, id: containerId } = getConfig(state);
  return {
    language,
    theme: getTheme(state),
    translations,
    containerId,
  };
};

const enhance = compose(connect(mapStateToProps), withPlugins('AppProviders'));

export default enhance(AppProviders);
