import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AddIcon from '@material-ui/icons/AddSharp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreSharp';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ns from '../config/css-ns';
import ManifestForm from '../containers/ManifestForm';
import ManifestListItem from '../containers/ManifestListItem';
import MiradorMenuButton from '../containers/MiradorMenuButton';

/**
 * An area for managing manifests and adding them to workspace
 * @memberof Workspace
 * @private
 */
export class WorkspaceAdd extends React.Component {
  /** */
  constructor(props) {
    super(props);

    this.state = { addResourcesOpen: false };

    this.setAddResourcesVisibility = this.setAddResourcesVisibility.bind(this);
  }

  /**
   * @private
   */
  setAddResourcesVisibility(bool) {
    this.setState({ addResourcesOpen: bool });
  }

  /**
   * render
   */
  render() {
    const {
      manifests, setWorkspaceAddVisibility, t, classes,
    } = this.props;
    const { addResourcesOpen } = this.state;

    const manifestList = Object.keys(manifests).map(manifest => (
      <ManifestListItem
        key={manifest}
        manifestId={manifest}
        handleClose={() => setWorkspaceAddVisibility(false)}
      />
    ));

    return (
      <div className={ns('workspace-add')}>
        <Paper className={classes.list}>
          <Typography variant="srOnly" component="h1">{t('miradorResources')}</Typography>
          <List>
            {manifestList}
          </List>
        </Paper>

        <Fab
          variant="extended"
          disabled={addResourcesOpen}
          className={classNames(classes.fab, ns('add-resource-button'))}
          color="secondary"
          onClick={() => (this.setAddResourcesVisibility(true))}
        >
          <AddIcon />
          {t('addResource')}
        </Fab>

        <Drawer
          className={classNames({
            [classes.displayNone]: !addResourcesOpen,
          })}
          classes={{ paper: classes.paper }}
          variant="persistent"
          anchor="bottom"
          open={addResourcesOpen}
          ModalProps={{
            disablePortal: true,
            hideBackdrop: true,
            style: { position: 'absolute' },
          }}
        >
          <Paper
            className={classes.form}
          >
            <AppBar position="absolute" color="secondary" onClick={() => (this.setAddResourcesVisibility(false))}>
              <Toolbar variant="dense">
                <MiradorMenuButton
                  aria-label={t('closeAddResourceMenu')}
                  className={classes.menuButton}
                  color="inherit"
                >
                  <ExpandMoreIcon />
                </MiradorMenuButton>
                <Typography variant="h2" noWrap color="inherit" className={classes.typographyBody}>
                  {t('addResource')}
                </Typography>
              </Toolbar>
            </AppBar>
            <ManifestForm
              addResourcesOpen={addResourcesOpen}
              onSubmit={() => (this.setAddResourcesVisibility(false))}
              onCancel={() => (this.setAddResourcesVisibility(false))}
            />
          </Paper>
        </Drawer>
      </div>
    );
  }
}

WorkspaceAdd.propTypes = {
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  manifests: PropTypes.instanceOf(Object).isRequired,
  setWorkspaceAddVisibility: PropTypes.func.isRequired,
  t: PropTypes.func,
};

WorkspaceAdd.defaultProps = {
  classes: {},
  t: key => key,
};
