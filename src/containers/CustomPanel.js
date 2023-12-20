import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { CustomPanel } from '../components/CustomPanel';
import { withWindowContext } from '../contexts/WindowContext';

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
  withWindowContext,
  connect(mapStateToProps),
  withPlugins('CustomPanel'),
);

export default enhance(CustomPanel);
