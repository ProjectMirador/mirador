import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { SearchHit } from '../components/SearchHit';
import * as actions from '../state/actions';
import {
  getCanvasLabel,
  getSearchAnnotationForCompanionWindow,
  getSelectedContentSearchAnnotationIds,
} from '../state/selectors';

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SearchHit
 * @private
 */
const mapStateToProps = (state, { hit, companionWindowId, windowId }) => {
  const annotation = getSearchAnnotationForCompanionWindow(
    state, { companionWindowId, windowId },
  );

  const resourceAnnotations = annotation.resources;
  const hitAnnotation = resourceAnnotations.find(r => r.id === hit.annotations[0]);

  return {
    canvasLabel: hitAnnotation && getCanvasLabel(state, {
      canvasId: hitAnnotation.targetId,
      windowId,
    }),
    selected: getSelectedContentSearchAnnotationIds(state, { windowId })[0] === hit.annotations[0],
  };
};

const mapDispatchToProps = {
  selectContentSearchAnnotation: actions.selectContentSearchAnnotation,
};

/** */
const styles = theme => ({
  focused: {},
  hitCounter: {
    ...theme.typography.h6,
    backgroundColor: theme.palette.hitCounter.default,
    marginRight: theme.spacing(1),
    verticalAlign: 'inherit',
  },
  inlineButton: {
    margin: 0,
    padding: 0,
    textDecoration: 'underline',
    textTransform: 'none',
  },
  listItem: {
    '&$selected': {
      '& $hitCounter': {
        backgroundColor: theme.palette.highlights.primary,
      },
      '&$focused': {
        '&:hover': {
          backgroundColor: 'inherit',
        },
        backgroundColor: 'inherit',
      },
    },
  },
  selected: {},
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withTranslation(),
  withPlugins('SearchHit'),
);

export default enhance(SearchHit);
