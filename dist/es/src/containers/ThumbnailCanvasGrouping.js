import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getCurrentCanvas } from '../state/selectors';
import { ThumbnailCanvasGrouping } from '../components/ThumbnailCanvasGrouping';
/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ThumbnailCanvasGrouping
 * @private
 */

var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref) {
  var data = _ref.data;
  return {
    setCanvas: function setCanvas() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return dispatch(actions.setCanvas.apply(actions, [data.windowId].concat(args)));
    }
  };
};
/**
 * mapStateToProps - used to hook up state to props
 * @memberof ThumbnailCanvasGrouping
 * @private
 */


var mapStateToProps = function mapStateToProps(state, _ref2) {
  var data = _ref2.data;
  return {
    currentCanvasId: (getCurrentCanvas(state, {
      windowId: data.windowId
    }) || {}).id
  };
};
/**
 * Styles for withStyles HOC
 */


var styles = function styles(theme) {
  return {
    canvas: {
      '&$currentCanvas': {
        outline: "2px solid ".concat(theme.palette.primary.main),
        outlineOffset: '3px'
      },
      '&:hover': {
        outline: "9px solid ".concat(theme.palette.action.hover),
        outlineOffset: '-2px'
      },
      boxSizing: 'border-box',
      color: theme.palette.common.white,
      cursor: 'pointer',
      display: 'inline-block',
      outline: 0,
      whiteSpace: 'nowrap'
    },
    currentCanvas: {}
  };
};

var enhance = compose(withTranslation(), withStyles(styles), connect(mapStateToProps, mapDispatchToProps), withPlugins('ThumbnailCanvasGrouping'));
export default enhance(ThumbnailCanvasGrouping);