function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { WorkspaceControlPanel } from '../components/WorkspaceControlPanel';
/**
 *
 * @param theme
 * @returns {{ctrlBtn: {margin: (number|string)},
 * drawer: {overflowX: string, height: string}}}
 */

var styles = function styles(theme) {
  var _branding;

  return {
    branding: (_branding = {
      display: 'flex',
      position: 'absolute'
    }, _defineProperty(_branding, theme.breakpoints.up('xs'), {
      display: 'none'
    }), _defineProperty(_branding, theme.breakpoints.up('sm'), {
      bottom: 0,
      display: 'block',
      "float": 'none',
      right: 'auto',
      width: '100%'
    }), _defineProperty(_branding, "right", 0), _branding),
    ctrlBtn: {
      margin: theme.spacing(1)
    },
    drawer: {
      overflowX: 'hidden'
    },
    root: _defineProperty({
      height: 64
    }, theme.breakpoints.up('sm'), {
      height: '100%',
      left: 0,
      right: 'auto',
      width: 64
    }),
    toolbar: _defineProperty({
      display: 'flex',
      justifyContent: 'space-between'
    }, theme.breakpoints.up('sm'), {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      minHeight: 0
    }),
    wide: {
      width: 'auto'
    },
    workspaceButtons: _defineProperty({}, theme.breakpoints.up('sm'), {
      display: 'flex',
      flexDirection: 'column'
    })
  };
};

var enhance = compose(withTranslation(), withStyles(styles), withPlugins('WorkspaceControlPanel') // further HOC go here
);
export default enhance(WorkspaceControlPanel);