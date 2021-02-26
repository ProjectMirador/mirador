function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { WorkspaceAdd } from '../components/WorkspaceAdd';
import { getCatalog } from '../state/selectors';
/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */

var mapStateToProps = function mapStateToProps(state) {
  return {
    catalog: getCatalog(state)
  };
};
/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */


var mapDispatchToProps = {
  addResource: actions.addResource,
  setWorkspaceAddVisibility: actions.setWorkspaceAddVisibility
};
/**
 *
 * @param theme
 * @returns {{typographyBody: {flexGrow: number, fontSize: string},
 * form: {paddingBottom: number, paddingTop: number, marginTop: number},
 * fab: {bottom: number, position: string, right: number},
 * menuButton: {marginRight: number, marginLeft: number}}}
 */

var styles = function styles(theme) {
  return {
    displayNone: {
      display: 'none'
    },
    fab: {
      bottom: theme.spacing(2),
      position: 'absolute',
      right: theme.spacing(2)
    },
    form: _objectSpread(_objectSpread({}, theme.mixins.gutters()), {}, {
      left: '0',
      marginTop: 48,
      paddingBottom: theme.spacing(2),
      paddingTop: theme.spacing(2),
      right: '0'
    }),
    list: {
      margin: '16px'
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20
    },
    paper: _defineProperty({
      borderTop: '0',
      left: '0'
    }, theme.breakpoints.up('sm'), {
      left: '65px'
    }),
    typographyBody: {
      flexGrow: 1
    },
    workspaceAdd: {
      boxSizing: 'border-box',
      height: '100%',
      overflowX: 'hidden',
      overflowY: 'auto',
      paddingTop: 68
    },
    // injection order matters
    // eslint-disable-next-line sort-keys
    '@media (min-width: 600px)': {
      workspaceAdd: {
        paddingLeft: 68,
        paddingTop: 0
      }
    }
  };
};

var enhance = compose(withTranslation(), withStyles(styles), connect(mapStateToProps, mapDispatchToProps), withPlugins('WorkspaceAdd'));
export default enhance(WorkspaceAdd);