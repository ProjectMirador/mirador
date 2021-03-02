import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AddIcon from '@material-ui/icons/AddSharp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreSharp';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ns from '../config/css-ns';
import ManifestForm from '../containers/ManifestForm';
import ManifestListItem from '../containers/ManifestListItem';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import { IIIFDropTarget } from './IIIFDropTarget';
import { PluginHook } from './PluginHook';

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
    this.ref = React.createRef();

    this.onSubmit = this.onSubmit.bind(this);
    this.setAddResourcesVisibility = this.setAddResourcesVisibility.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  /** */
  handleDrop({ manifestId, manifestJson }, props, monitor) {
    const { addResource } = this.props;

    if (manifestJson) {
      addResource(manifestId, manifestJson, { provider: 'file' });
    } else {
      addResource(manifestId);
    }

    this.scrollToTop();
  }

  /** @private */
  onSubmit() {
    this.setAddResourcesVisibility(false);
    this.scrollToTop();
  }

  /**
   * @private
   */
  setAddResourcesVisibility(bool) {
    this.setState({ addResourcesOpen: bool });
  }

  /** Scroll the list back to the top */
  scrollToTop() {
    if (this.ref.current) {
      const el = this.ref.current;
      el.scrollTo({ behavior: 'smooth', left: 0, top: 0 });
    }
  }

  /**
   * render
   */
  render() {
    const {
      catalog, setWorkspaceAddVisibility, t, classes,
    } = this.props;
    const { addResourcesOpen } = this.state;

    console.log(catalog);

    const manifestList = catalog.map((resource, index) => (
      <ManifestListItem
        {...(index === 0 && { buttonRef: (ref => ref && ref.focus()) })}
        key={resource.manifestId}
        manifestId={resource.manifestId}
        provider={resource.provider}
        tileFormat={resource.tileFormat}
        handleClose={() => setWorkspaceAddVisibility(false)}
      />
    ));

    return (
      <IIIFDropTarget onDrop={this.handleDrop}>
        <div ref={this.ref} className={classNames(ns('workspace-add'), classes.workspaceAdd)}>
          {catalog.length < 1 ? (
            <Grid
              alignItems="center"
              container
              style={{
                height: '100%',
              }}
            >
              <Grid
                xs={12}
                item
              >
                <Typography
                  variant="h1"
                  component="div"
                  align="center"
                >
                  {t('emptyResourceList')}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Paper className={classes.list}>
              <Typography variant="srOnly" component="h1">{t('miradorResources')}</Typography>
              <PluginHook {...this.props} />
              <List disablePadding>
                {manifestList}
              </List>
            </Paper>
          )}
          <Fab
            variant="extended"
            disabled={addResourcesOpen}
            className={classNames(classes.fab, ns('add-resource-button'))}
            color="primary"
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
              <AppBar position="absolute" color="primary" onClick={() => (this.setAddResourcesVisibility(false))}>
                <Toolbar variant="dense">
                  <MiradorMenuButton
                    aria-label={t('closeAddResourceForm')}
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
                onSubmit={this.onSubmit}
                onCancel={() => (this.setAddResourcesVisibility(false))}
              />
            </Paper>
          </Drawer>
        </div>
      </IIIFDropTarget>
    );
  }
}

WorkspaceAdd.propTypes = {
  addResource: PropTypes.func,
  catalog: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.objectOf(PropTypes.string),
  setWorkspaceAddVisibility: PropTypes.func.isRequired,
  t: PropTypes.func,
};

WorkspaceAdd.defaultProps = {
  addResource: () => {},
  catalog: [],
  classes: {},
  t: key => key,
};
