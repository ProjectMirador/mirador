import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { AVViewer } from '../components/AVViewer';
import { getVisibleCanvases } from '../state/selectors';

/** */
const mapStateToProps = (state, { windowId }) => (
  {
    currentCanvases: getVisibleCanvases(state, { windowId }) || [],
  }
);

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, null),
  withPlugins('AVViewer'),
);

export default enhance(AVViewer);
