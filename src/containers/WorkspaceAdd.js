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
const mapStateToProps = state => ({ catalog: getCatalog(state) });

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
const mapDispatchToProps = {
  addResource: actions.addResource,
  setWorkspaceAddVisibility: actions.setWorkspaceAddVisibility,
};

/**
 *
 * @param theme
 * @returns {{typographyBody: {flexGrow: number, fontSize: string},
 * form: {paddingBottom: number, paddingTop: number, marginTop: number},
 * fab: {bottom: number, position: string, right: number},
 * menuButton: {marginRight: number, marginLeft: number}}}
 */
const styles = theme => ({
  displayNone: {
    display: 'none',
  },
  fab: {
    bottom: theme.spacing(2),
    position: 'absolute',
    right: theme.spacing(2),
  },
  form: {
    left: '0',
    marginTop: 48,
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    paddingTop: theme.spacing(2),
    right: '0',
  },
  list: {
    margin: '16px',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  paper: {
    borderTop: '0',
    left: '0',
    [theme.breakpoints.up('sm')]: {
      left: '65px',
    },
  },
  typographyBody: {
    flexGrow: 1,
  },
  workspaceAdd: {
    boxSizing: 'border-box',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    paddingTop: 68,
  },
  // injection order matters
  // eslint-disable-next-line sort-keys
  '@media (min-width: 600px)': {
    workspaceAdd: {
      paddingLeft: 68,
      paddingTop: 0,
    },
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WorkspaceAdd'),
);

export default enhance(WorkspaceAdd);
