import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { getManifestLogo, getRequiredStatement, getRights } from '../state/selectors';
import { AttributionPanel } from '../components/AttributionPanel';
/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarInfoPanel
 * @private
 */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id,
      windowId = _ref.windowId;
  return {
    manifestLogo: getManifestLogo(state, {
      windowId: windowId
    }),
    requiredStatement: getRequiredStatement(state, {
      windowId: windowId
    }),
    rights: getRights(state, {
      windowId: windowId
    })
  };
};
/**
 *
 * @param theme
 * @returns {label: {paddingLeft: number}}}
 */


var styles = function styles(theme) {
  return {
    logo: {
      maxWidth: '100%'
    },
    placeholder: {
      backgroundColor: theme.palette.grey[300]
    },
    section: {
      borderBottom: ".5px solid ".concat(theme.palette.section_divider),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(2)
    }
  };
};

var enhance = compose(withStyles(styles), withTranslation(), connect(mapStateToProps), withPlugins('AttributionPanel'));
export default enhance(AttributionPanel);