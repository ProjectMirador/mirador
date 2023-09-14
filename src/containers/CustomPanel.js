import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { CustomPanel } from '../components/CustomPanel';

/**
 * mapStateToProps - to hook up connect
 */
const mapStateToProps = (state, { id, windowId }) => ({
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps),
  withPlugins('CustomPanel'),
);

export default enhance(CustomPanel);
