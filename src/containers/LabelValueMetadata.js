import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import { getConfig } from '../state/selectors';
import { LabelValueMetadata } from '../components/LabelValueMetadata';

/** */
const mapStateToProps = (state) => ({
  labelValueJoiner: getConfig(state).labelValueJoiner,
});

const enhance = compose(
  connect(mapStateToProps),
  withPlugins('LabelValueMetadata'),
);

export default enhance(LabelValueMetadata);
