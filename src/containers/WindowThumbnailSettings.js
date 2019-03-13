import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../state/actions';
import { getThumbnailNavigationPosition } from '../state/selectors';
import { WindowThumbnailSettings } from '../components/WindowThumbnailSettings';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = { setWindowThumbnailPosition: actions.setWindowThumbnailPosition };

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = (state, props) => (
  {
    thumbnailNavigationPosition: getThumbnailNavigationPosition(state, props.windowId),
  }
);

/** */
const styles = theme => ({
  selectedLabel: {
    color: theme.palette.secondary.main,
  },
  MenuItem: {
    display: 'inline',
  },
});

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  // further HOC go here
);

export default enhance(WindowThumbnailSettings);
