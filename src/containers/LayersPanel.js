import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { LayersPanel } from '../components/LayersPanel';
import {
  getVisibleCanvases,
} from '../state/selectors';

/**
 * mapStateToProps - to hook up connect
 */
const mapStateToProps = (state, { id, windowId }) => ({
  canvases: getVisibleCanvases(state, { windowId }),
});

/**
 *
 * @param theme
 * @returns {label: {paddingLeft: number}}}
 */
const styles = theme => ({
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps),
  withPlugins('LayersPanel'),
);

export default enhance(LayersPanel);
