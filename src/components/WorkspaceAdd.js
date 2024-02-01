import { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import classNames from 'classnames';
import AddIcon from '@mui/icons-material/AddSharp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreSharp';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';
import ns from '../config/css-ns';
import ManifestForm from '../containers/ManifestForm';
import ManifestListItem from '../containers/ManifestListItem';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import { IIIFDropTarget } from './IIIFDropTarget';
import { PluginHook } from './PluginHook';

const StyledWorkspaceAdd = styled('div')(() => ({
  boxSizing: 'border-box',
  height: '100%',
  overflowX: 'hidden',
  overflowY: 'auto',
}));

const StyledMiradorMenuButton = styled(MiradorMenuButton)(() => ({
  marginLeft: -12,
  marginRight: 20,
}));
/**
 * An area for managing manifests and adding them to workspace
 * @memberof Workspace
 * @private
 */
export class WorkspaceAdd extends Component {
  /** */
  constructor(props) {
    super(props);

    this.state = { addResourcesOpen: false };
    this.ref = createRef();

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
      catalog, setWorkspaceAddVisibility, t,
    } = this.props;
    const { addResourcesOpen } = this.state;

    const manifestList = catalog.map((resource, index) => (
      <ManifestListItem
        {...(index === 0 && { buttonRef: (ref => ref && ref.focus()) })}
        key={resource.manifestId}
        manifestId={resource.manifestId}
        provider={resource.provider}
        handleClose={() => setWorkspaceAddVisibility(false)}
      />
    ));

    return (
      <IIIFDropTarget onDrop={this.handleDrop}>
        <StyledWorkspaceAdd ref={this.ref} className={classNames(ns('workspace-add'))}>
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
            <Paper sx={{ margin: 2 }}>
              <Typography style={visuallyHidden} component="h1">{t('miradorResources')}</Typography>
              <PluginHook {...this.props} />
              <List disablePadding>
                {manifestList}
              </List>
            </Paper>
          )}
          <Fab
            variant="extended"
            disabled={addResourcesOpen}
            sx={(theme) => ({
              bottom: theme.spacing(2),
              position: 'absolute',
              right: theme.spacing(2),
            })}
            className={classNames(ns('add-resource-button'))}
            color="primary"
            onClick={() => (this.setAddResourcesVisibility(true))}
          >
            <AddIcon />
            {t('addResource')}
          </Fab>

          <Drawer
            sx={theme => ({
              '.MuiDrawer-paper': {
                borderTop: '0',
                left: '0',
                [theme.breakpoints.up('sm')]: {
                  left: '65px',
                },
              },
              ...(!addResourcesOpen && {
                display: 'none',
              }),
            })}
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
              sx={{
                left: '0',
                marginTop: 6,
                paddingBottom: 2,
                paddingLeft: { sm: 3, xs: 2 },
                paddingRight: { sm: 3, xs: 2 },
                paddingTop: 2,
                right: '0',
              }}
            >
              <AppBar position="absolute" color="primary" enableColorOnDark onClick={() => (this.setAddResourcesVisibility(false))}>
                <Toolbar variant="dense">
                  <StyledMiradorMenuButton
                    aria-label={t('closeAddResourceForm')}
                    color="inherit"
                  >
                    <ExpandMoreIcon />
                  </StyledMiradorMenuButton>
                  <Typography variant="h2" noWrap color="inherit" sx={{ flexGrow: 1 }}>
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
        </StyledWorkspaceAdd>
      </IIIFDropTarget>
    );
  }
}

WorkspaceAdd.propTypes = {
  addResource: PropTypes.func,
  catalog: PropTypes.arrayOf(PropTypes.shape({
    manifestId: PropTypes.string.isRequired,
    provider: PropTypes.string,
  })),
  setWorkspaceAddVisibility: PropTypes.func.isRequired,
  t: PropTypes.func,
};

WorkspaceAdd.defaultProps = {
  addResource: () => {},
  catalog: [],
  t: key => key,
};
