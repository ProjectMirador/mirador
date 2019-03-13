import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import * as actions from '../state/actions';
import { WorkspaceAdd } from '../components/WorkspaceAdd';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => ({ manifests: state.manifests });

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
const mapDispatchToProps = { setWorkspaceAddVisibility: actions.setWorkspaceAddVisibility };

/**
 *
 * @param theme
 * @returns {{typographyBody: {flexGrow: number, fontSize: string},
 * form: {paddingBottom: number, paddingTop: number, marginTop: number},
 * fab: {bottom: number, position: string, right: number},
 * menuButton: {marginRight: number, marginLeft: number}}}
 */
const styles = theme => ({
  form: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: 64,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  displayNone: {
    display: 'none',
  },
  typographyBody: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(WorkspaceAdd);
