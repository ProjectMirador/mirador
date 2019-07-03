import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend/withPlugins';
import { WorkspaceSelectionDialog } from '../components/WorkspaceSelectionDialog';
import * as actions from '../state/actions';
import { getWorkspaceType } from '../state/selectors';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = {
  updateWorkspace: actions.updateWorkspace,
};

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => ({ workspaceType: getWorkspaceType(state) });

/** */
const styles = theme => ({
  card: {
    backgroundColor: 'transparent',
    borderRadius: '0',
    boxShadow: '0 0 transparent',
    display: 'flex',
  },
  content: {
    flex: '1 0 auto',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  headline: {
    paddingBottom: '6px',
  },
  list: {
    '&active': {
      outline: 'none',
    },
    '&focus': {
      outline: 'none',
    },
    outline: 'none',
  },
  media: {
    flex: '0 0 120px',
    height: '90px',
  },
  menuItem: {
    height: 'auto',
    overflow: 'auto',
    whiteSpace: 'inherit',
  },
  root: {
    '&:last-child': {
      paddingBottom: '12px',
    },
    paddingBottom: 0,
    paddingTop: 0,
    textAlign: 'left',
  },
  svgIcon: {
    flexShrink: 0,
    height: '90px',
    width: '120px',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WorkspaceSelectionDialog'),
);

export default enhance(WorkspaceSelectionDialog);
