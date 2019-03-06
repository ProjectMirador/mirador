import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AddIcon from '@material-ui/icons/AddSharp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreSharp';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ns from '../config/css-ns';
import ManifestForm from '../containers/ManifestForm';
import ManifestListItem from '../containers/ManifestListItem';

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
        <Typography variant="srOnly" component="h1">{t('miradorResources')}</Typography>
        <List>
          {manifestList}
        </List>

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
          variant="persistent"
          anchor="bottom"
          open={addResourcesOpen}
          PaperProps={{ style: { position: 'absolute', left: 100 } }}
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
              <Toolbar>
                <IconButton className={classes.menuButton} color="inherit" aria-label={t('closeAddResourceMenu')}>
                  <ExpandMoreIcon />
                </IconButton>
                <Typography variant="h2" noWrap color="inherit" className={classes.typographyBody}>
                  {t('addResource')}
                </Typography>
              </Toolbar>
            </AppBar>
            <ManifestForm onCancel={() => (this.setAddResourcesVisibility(false))} />
          </Paper>
        </Drawer>
      </div>
    );
  }
}

WorkspaceAdd.propTypes = {
  manifests: PropTypes.instanceOf(Object).isRequired,
  setWorkspaceAddVisibility: PropTypes.func.isRequired,
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
};

WorkspaceAdd.defaultProps = {
  classes: {},
  t: key => key,
};
