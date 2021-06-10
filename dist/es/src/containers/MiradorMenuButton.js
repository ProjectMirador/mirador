import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import { MiradorMenuButton } from '../components/MiradorMenuButton';
import { getContainerId } from '../state/selectors';
/** */

var mapStateToProps = function mapStateToProps(state) {
  return {
    containerId: getContainerId(state)
  };
};

var enhance = compose(connect(mapStateToProps, null), withPlugins('MiradorMenuButton'));
export default enhance(MiradorMenuButton);