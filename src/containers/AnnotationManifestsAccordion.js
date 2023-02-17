import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { AnnotationManifestsAccordion } from '../components/AnnotationManifestsAccordion';
import * as actions from '../state/actions';
import { getConfig } from '../state/selectors';

/** For connect */
const mapStateToProps = (state, { canvasId, windowId }) => ({
  htmlSanitizationRuleSet: getConfig(state).annotations.htmlSanitizationRuleSet,
});

/**
 * mapDispatchToProps - to hook up connect
 * @memberof WindowSideBarAnnotationsPanel
 * @private
 */
const mapDispatchToProps = {
  addResource: actions.addResource,
  addWindow: actions.addWindow,
};

/** For withStyles */
const styles = theme => ({
  manifestContainer: {
    backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  test: {
    backgroundColor: 'red',
    color: 'red',
    fontColor: 'red',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('AnnotationManifestsAccordion'),
);

export default enhance(AnnotationManifestsAccordion);
