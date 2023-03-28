import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import { CustomPanel } from '../components/CustomPanel';
import { withWindowContext } from '../contexts/WindowContext';

/**
 * mapStateToProps - to hook up connect
 */
const mapStateToProps = (state, { id, windowId }) => ({
});

const enhance = compose(
  withWindowContext,
  connect(mapStateToProps),
  withPlugins('CustomPanel'),
);

export default enhance(CustomPanel);
