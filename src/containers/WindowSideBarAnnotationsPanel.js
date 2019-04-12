import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend';
import {
  getSelectedCanvases,
  getAnnotationResourcesByMotivation,
} from '../state/selectors';
import { WindowSideBarAnnotationsPanel } from '../components/WindowSideBarAnnotationsPanel';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarAnnotationsPanel
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  annotationCount: getAnnotationResourcesByMotivation(state, { motivations: ['oa:commenting', 'sc:painting'], windowId }).length,
  selectedCanvases: getSelectedCanvases(state, { windowId }),
});


/** */
const styles = theme => ({
  section: {
    borderBottom: '.5px solid rgba(0,0,0,0.25)',
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 2,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, null),
  withPlugins('WindowSideBarAnnotationPanel'),
  // further HOC
);

export default enhance(WindowSideBarAnnotationsPanel);
