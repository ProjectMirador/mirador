import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { getWindowIds, getWorkspace } from '../state/selectors';
import { WindowListButton } from '../components/WindowListButton';
/** */

var mapStateToProps = function mapStateToProps(state) {
  return {
    disabled: getWorkspace(state).isWorkspaceAddVisible,
    windowCount: getWindowIds(state).length
  };
};
/**
 *
 * @param theme
 * @returns {{background: {background: string}}}
 */


var styles = function styles(theme) {
  return {
    badge: {
      paddingLeft: 12
    },
    ctrlBtn: {
      margin: theme.spacing(1)
    },
    ctrlBtnSelected: {
      backgroundColor: theme.palette.action.selected
    }
  };
};

var enhance = compose(withTranslation(), withStyles(styles), connect(mapStateToProps, null), withPlugins('WindowListButton'));
export default enhance(WindowListButton);