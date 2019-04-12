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
  updateConfig: actions.updateConfig,
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
    paddingBottom: '0',
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
  listItem: {
    '&:focus': {
      backgroundColor: theme.palette.action.focus,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    cursor: 'pointer',
  },
  media: {
    flex: '0 0 120px',
    height: '90px',
  },
  root: {
    '&:last-child': {
      paddingBottom: '12px',
    },
    paddingBottom: 0,
    paddingTop: 0,
    textAlign: 'left',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WorkspaceSelectionDialog'),
);

export default enhance(WorkspaceSelectionDialog);
