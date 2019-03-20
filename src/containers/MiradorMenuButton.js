import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend';
import { MiradorMenuButton } from '../components/MiradorMenuButton';

/** */
const mapStateToProps = state => ({
  containerId: state.config.id,
});

const enhance = compose(
  connect(mapStateToProps, null),
  withPlugins('MiradorMenuButton'),
);

export default enhance(MiradorMenuButton);
