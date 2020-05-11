import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { CustomPanel } from '../components/CustomPanel';
import {
} from '../state/selectors';

/**
 * mapStateToProps - to hook up connect
 */
const mapStateToProps = (state, { id, windowId }) => ({
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
  withPlugins('CustomPanel'),
);

export default enhance(CustomPanel);
