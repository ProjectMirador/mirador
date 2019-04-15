import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import {
  getManifestLogo,
  getRequiredStatement,
  getRights,
} from '../state/selectors';
import { AttributionPanel } from '../components/AttributionPanel';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarInfoPanel
 * @private
 */
const mapStateToProps = (state, { id, windowId }) => ({
  manifestLogo: getManifestLogo(state, { windowId }),
  requiredStatement: getRequiredStatement(state, { windowId }),
  rights: getRights(state, { windowId }),
});

/**
 *
 * @param theme
 * @returns {label: {paddingLeft: number}}}
 */
const styles = theme => ({
  logo: {
    maxWidth: '100%',
  },
  placeholder: {
    backgroundColor: theme.palette.grey[300],
  },
  section: {
    borderBottom: '.5px solid rgba(0,0,0,0.25)',
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 2,
  },
});

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps),
  withPlugins('ManifestInfo'),
);

export default enhance(AttributionPanel);
