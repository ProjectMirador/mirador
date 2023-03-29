import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogTitle,
  Link,
  MenuList,
  MenuItem,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBackSharp';
import Skeleton from '@mui/material/Skeleton';
import asArray from '../lib/asArray';
import { LabelValueMetadata } from './LabelValueMetadata';
import CollapsibleSection from '../containers/CollapsibleSection';
import ScrollIndicatedDialogContent from '../containers/ScrollIndicatedDialogContent';
import ManifestInfo from '../containers/ManifestInfo';

/**
 * a dialog providing the possibility to select the collection
 */
export class CollectionDialog extends Component {
  /** */
  static getUseableLabel(resource, index) {
    return (resource
      && resource.getLabel
      && resource.getLabel().length > 0)
      ? resource.getLabel().getValue()
      : String(index + 1);
  }

  /** */
  constructor(props) {
    super(props);

    this.state = { filter: null };
    this.hideDialog = this.hideDialog.bind(this);
  }

  /** */
  setFilter(filter) {
    this.setState({ filter });
  }

  /** */
  hideDialog() {
    const {
      hideCollectionDialog, windowId,
    } = this.props;

    hideCollectionDialog(windowId);
  }

  /** */
  selectCollection(c) {
    const {
      collectionPath,
      manifestId,
      showCollectionDialog,
      windowId,
    } = this.props;

    showCollectionDialog(c.id, [...collectionPath, manifestId], windowId);
  }

  /** */
  goToPreviousCollection() {
    const { collectionPath, showCollectionDialog, windowId } = this.props;

    showCollectionDialog(
      collectionPath[collectionPath.length - 1],
      collectionPath.slice(0, -1),
      windowId,
    );
  }

  /** */
  selectManifest(m) {
    const {
      addWindow,
      collectionPath,
      manifestId,
      setWorkspaceAddVisibility,
      updateWindow,
      windowId,
    } = this.props;

    if (windowId) {
      updateWindow(windowId, {
        canvasId: null, collectionPath: [...collectionPath, manifestId], manifestId: m.id,
      });
    } else {
      addWindow({ collectionPath: [...collectionPath, manifestId], manifestId: m.id });
    }

    this.hideDialog();
    setWorkspaceAddVisibility(false);
  }

  /** */
  dialogContainer() {
    const { container, windowId } = this.props;
    return (container?.current || document.body).querySelector(`#${windowId}`);
  }

  /** */
  placeholder() {
    const { classes } = this.props;

    return (
      <Dialog
        className={classes.dialog}
        onClose={this.hideDialog}
        open
        container={this.dialogContainer()}
        BackdropProps={this.backdropProps()}
      >
        <DialogTitle id="select-collection">
          <Skeleton className={classes.placeholder} variant="text" />
        </DialogTitle>
        <ScrollIndicatedDialogContent>
          <Skeleton className={classes.placeholder} variant="text" />
          <Skeleton className={classes.placeholder} variant="text" />
        </ScrollIndicatedDialogContent>
      </Dialog>
    );
  }

  /** */
  backdropProps() {
    const { classes } = this.props;
    return { classes: { root: classes.dialog } };
  }

  /** */
  render() {
    const {
      classes,
      collection,
      error,
      isMultipart,
      manifest,
      ready,
      t,
    } = this.props;

    const { filter } = this.state;

    if (error) return null;
    // If this component is optimistically rendering ahead of the window its in
    // force a re-render so that it is placed correctly. The right thing here is
    // to maybe pass a ref.
    if (!this.dialogContainer()) {
      this.forceUpdate();
      return null;
    }
    if (!ready) return this.placeholder();

    const rights = manifest && (asArray(manifest.getProperty('rights') || manifest.getProperty('license')));

    const requiredStatement = manifest
      && asArray(manifest.getRequiredStatement()).filter(l => l.getValue()).map(labelValuePair => ({
        label: null,
        values: labelValuePair.getValues(),
      }));

    const collections = manifest.getCollections();

    const currentFilter = filter || (collections.length > 0 ? 'collections' : 'manifests');

    return (
      <Dialog
        className={classes.dialog}
        onClose={this.hideDialog}
        container={this.dialogContainer()}
        BackdropProps={this.backdropProps()}
        open
      >
        <DialogTitle id="select-collection">
          <Typography component="div" variant="overline">
            { t(isMultipart ? 'multipartCollection' : 'collection') }
          </Typography>
          <Typography variant="h3">
            {CollectionDialog.getUseableLabel(manifest)}
          </Typography>
        </DialogTitle>
        <ScrollIndicatedDialogContent className={classes.dialogContent}>
          { collection && (
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => this.goToPreviousCollection()}
            >
              {CollectionDialog.getUseableLabel(collection)}
            </Button>
          )}

          <div className={classes.collectionMetadata}>
            <ManifestInfo manifestId={manifest.id} />
            <CollapsibleSection
              id="select-collection-rights"
              label={t('attributionTitle')}
            >
              { requiredStatement && (
                <LabelValueMetadata labelValuePairs={requiredStatement} defaultLabel={t('attribution')} />
              )}
              {
                rights && rights.length > 0 && (
                  <>
                    <Typography variant="subtitle2" component="dt">{t('rights')}</Typography>
                    { rights.map(v => (
                      <Typography variant="body1" component="dd" key={v}>
                        <Link target="_blank" rel="noopener noreferrer" href={v}>
                          {v}
                        </Link>
                      </Typography>
                    )) }
                  </>
                )
              }
            </CollapsibleSection>
          </div>
          <div className={classes.collectionFilter}>
            {manifest.getTotalCollections() > 0 && (
              <Chip clickable color={currentFilter === 'collections' ? 'primary' : 'default'} onClick={() => this.setFilter('collections')} label={t('totalCollections', { count: manifest.getTotalCollections() })} />
            )}
            {manifest.getTotalManifests() > 0 && (
              <Chip clickable color={currentFilter === 'manifests' ? 'primary' : 'default'} onClick={() => this.setFilter('manifests')} label={t('totalManifests', { count: manifest.getTotalManifests() })} />
            )}
          </div>
          { currentFilter === 'collections' && (
            <MenuList>
              {
                collections.map(c => (
                  <MenuItem
                    key={c.id}
                    onClick={() => { this.selectCollection(c); }}
                    className={classes.collectionItem}
                  >
                    {CollectionDialog.getUseableLabel(c)}
                  </MenuItem>
                ))
              }
            </MenuList>
          )}
          { currentFilter === 'manifests' && (
            <MenuList>
              {
                manifest.getManifests().map(m => (
                  <MenuItem
                    key={m.id}
                    onClick={() => { this.selectManifest(m); }}
                    className={classes.collectionItem}
                  >
                    {CollectionDialog.getUseableLabel(m)}
                  </MenuItem>
                ))
              }
            </MenuList>
          )}
        </ScrollIndicatedDialogContent>
        <DialogActions>
          <Button onClick={this.hideDialog}>
            {t('close')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

CollectionDialog.propTypes = {
  addWindow: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  collection: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  collectionPath: PropTypes.arrayOf(PropTypes.string),
  container: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  error: PropTypes.string,
  hideCollectionDialog: PropTypes.func.isRequired,
  isMultipart: PropTypes.bool,
  manifest: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  manifestId: PropTypes.string.isRequired,
  ready: PropTypes.bool,
  setWorkspaceAddVisibility: PropTypes.func.isRequired,
  showCollectionDialog: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  updateWindow: PropTypes.func.isRequired,
  windowId: PropTypes.string,
};

CollectionDialog.defaultProps = {
  collection: null,
  collectionPath: [],
  container: null,
  error: null,
  isMultipart: false,
  ready: false,
  windowId: null,
};
