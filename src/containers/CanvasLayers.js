import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../state/actions';
import {
  getCanvasLabel,
  getLayers,
  getSortedLayers,
} from '../state/selectors';
import { CanvasLayers } from '../components/CanvasLayers';
import { withWindowContext } from '../contexts/WindowContext';

/** For connect */
const mapStateToProps = (state, { canvasId, windowId }) => ({
  label: getCanvasLabel(state, { canvasId, windowId }),
  layerMetadata: getLayers(state, { canvasId, windowId }),
  layers: getSortedLayers(state, { canvasId, windowId }),
});

/**
 * mapDispatchToProps - to hook up connect
 * @memberof WindowSideBarAnnotationsPanel
 * @private
 */
const mapDispatchToProps = {
  updateLayers: actions.updateLayers,
};

/** For withStlyes */
const styles = theme => ({
  dragging: {},
  dragHandle: {
    alignItems: 'center',
    borderRight: `0.5px solid ${theme.palette.divider}`,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    marginBottom: -1 * theme.spacing(2) + 0.5,
    marginRight: theme.spacing(1),
    marginTop: -1 * theme.spacing(2),
    maxWidth: theme.spacing(3),
    width: theme.spacing(3),
  },
  image: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  label: {
    paddingLeft: theme.spacing(1),
  },
  list: {
    paddingTop: 0,
  },
  listItem: {
    '& $dragHandle': {
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
      backgroundColor: theme.palette.shades?.light,
    },
    '&$dragging': {
      '& $dragHandle, & $dragHandle:hover': {
        backgroundColor: theme.palette.action.selected,
      },
      backgroundColor: theme.palette.action.hover,
    },
    alignItems: 'stretch',
    borderBottom: `0.5px solid ${theme.palette.divider}`,
    cursor: 'pointer',
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
  opacityIcon: {
    marginRight: theme.spacing(0.5),
  },
  opacityInput: {
    ...theme.typography.caption,
    '&::-webkit-outer-spin-button,&::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '-moz-appearance': 'textfield',
    textAlign: 'right',
    width: '3ch',
  },
  sectionHeading: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
  slider: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    maxWidth: 150,
  },
  thumbnail: {
    minWidth: 50,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  withWindowContext,
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(CanvasLayers);
