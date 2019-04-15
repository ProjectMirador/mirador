import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import { MiradorMenuButton } from '../components/MiradorMenuButton';
import { getContainerId } from '../state/selectors';

/** */
const mapStateToProps = state => ({
  containerId: getContainerId(state),
});

const enhance = compose(
  connect(mapStateToProps, null),
  withPlugins('MiradorMenuButton'),
);

export default enhance(MiradorMenuButton);
