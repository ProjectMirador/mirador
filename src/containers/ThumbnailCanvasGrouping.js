import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend';
import * as actions from '../state/actions';
import { ThumbnailCanvasGrouping } from '../components/ThumbnailCanvasGrouping';

/**
 * mapStateToProps - used to hook up state to props
 * @memberof ThumbnailCanvasGrouping
 * @private
 */
const mapStateToProps = ({
  companionWindows, config, windows,
}, { windowId }) => ({
  config,
  position: companionWindows[windows[windowId].thumbnailNavigationId].position,
  window: windows[windowId],
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ThumbnailCanvasGrouping
 * @private
 */
const mapDispatchToProps = {
  setCanvas: actions.setCanvas,
};

/**
 * Styles for withStyles HOC
 */
const styles = theme => ({
  canvas: {
    '&$currentCanvas': {
      border: `2px solid ${theme.palette.secondary.main}`,
    },
    border: '2px solid transparent',
    color: theme.palette.common.white,
    cursor: 'pointer',
    margin: '2px',
    padding: '2px',
  },
  canvasThumbLabel: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    bottom: '0px',
    left: '0px',
    position: 'absolute',
  },
  currentCanvas: {
  },
  root: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  title: {
    color: '#ffffff',
  },
});

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('ThumnailNavigation'),
);

export default enhance(ThumbnailCanvasGrouping);
