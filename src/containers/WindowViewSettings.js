import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getWindowViewType, getCanvasIndex } from '../state/selectors';
import { WindowViewSettings } from '../components/WindowViewSettings';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = { setWindowViewType: actions.setWindowViewType };

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = (state, { windowId }) => (
  {
    canvasIndex: getCanvasIndex(state, { windowId }),
    windowViewType: getWindowViewType(state, { windowId }),
  }
);

/** */
const styles = theme => ({
  label: {
    borderBottom: '2px solid transparent',
  },
  MenuItem: {
    display: 'inline',
  },
  /* Pseudo-class applied to the root element if `selected={true}`. */
  selected: {},
  toggleButton: {
    '&$selected': {
      '& $label': {
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
      },
      color: theme.palette.secondary.main,
    },
    border: 0,
    color: 'inherit',
    textTransform: 'inherit',
  },
});

const enhance = compose(
  withStyles(styles),
  withTranslation(null, { withRef: true }),
  connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true }),
  withPlugins('WindowViewSettings'),
);

export default enhance(WindowViewSettings);
