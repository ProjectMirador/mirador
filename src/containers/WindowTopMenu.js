import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend';
import { WindowTopMenu } from '../components/WindowTopMenu';
import { getContainerId } from '../state/selectors';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowTopMenu
 * @private
 */
const mapStateToProps = state => ({
  containerId: getContainerId(state),
});

const enhance = compose(
  connect(mapStateToProps, null),
  withPlugins('WindowTopMenu'),
);

export default enhance(WindowTopMenu);
