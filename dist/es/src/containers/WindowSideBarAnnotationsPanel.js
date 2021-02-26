import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { getVisibleCanvasIds, getAnnotationResourcesByMotivation } from '../state/selectors';
import { WindowSideBarAnnotationsPanel } from '../components/WindowSideBarAnnotationsPanel';
/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarAnnotationsPanel
 * @private
 */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    annotationCount: getAnnotationResourcesByMotivation(state, {
      windowId: windowId
    }).length,
    canvasIds: getVisibleCanvasIds(state, {
      windowId: windowId
    })
  };
};
/** */


var styles = function styles(theme) {
  return {
    section: {
      borderBottom: ".5px solid ".concat(theme.palette.section_divider),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(2)
    }
  };
};

var enhance = compose(withTranslation(), withStyles(styles), connect(mapStateToProps, null), withPlugins('WindowSideBarAnnotationsPanel') // further HOC
);
export default enhance(WindowSideBarAnnotationsPanel);