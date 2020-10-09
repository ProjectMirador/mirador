import React, { Component } from 'react';
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
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBackSharp';
import Skeleton from '@material-ui/lab/Skeleton';
import { LabelValueMetadata } from './LabelValueMetadata';
import CollapsibleSection from '../containers/CollapsibleSection';
import ScrollIndicatedDialogContent from '../containers/ScrollIndicatedDialogContent';
import ManifestInfo from '../containers/ManifestInfo';

/**
 */
function asArray(value) {
  if (!Array.isArray(value)) {
    return [value];
  }

  return value;
}

/**
 * a dialog providing the possibility to select the collection
 */
export class CollectionDialog extends Component {
  /** */
  static getUseableLabel(resource, index) {
    return (resource
      && resource.getLabel
      && resource.getLabel().length > 0)
      ? resource.getLabel().map(label => label.value)[0]
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
      hideCollectionDialog, hideWindowCollectionDialog, variant, windowId,
    } = this.props;
    if (variant === 'window') {
      hideWindowCollectionDialog(windowId);
    } else {
      hideCollectionDialog();
    }
  }

  /** */
  showCollectionDialog(...args) {
    const { showCollectionDialog, showWindowCollectionDialog, variant } = this.props;
    return variant === 'window' ? showWindowCollectionDialog(...args) : showCollectionDialog(...args);
  }

  /** */
  selectCollection(c) {
    const {
      collectionPath,
      manifestId,
      windowId,
    } = this.props;

    this.showCollectionDialog(c.id, [...collectionPath, manifestId], windowId);
  }

  /** */
  goToPreviousCollection() {
    const { collectionPath, windowId } = this.props;

    this.showCollectionDialog(
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
  placeholder() {
    const { classes, containerId, windowId } = this.props;

    return (
      <Dialog
        className={classes.dialog}
        onClose={this.hideDialog}
        open
        container={document.querySelector(`#${containerId} #${windowId}`)}
        BackdropProps={this.backdropProps()}
      >
        <DialogTitle id="select-collection" disableTypography>
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
      containerId,
      error,
      isMultipart,
      manifest,
      ready,
      t,
      windowId,
    } = this.props;

    const { filter } = this.state;

    if (error) return null;
    if (!ready) return this.placeholder();

    const rights = manifest && (asArray(manifest.getProperty('rights') || manifest.getProperty('license')));

    const requiredStatement = manifest
      && asArray(manifest.getRequiredStatement()).filter(l => l.getValue()).map(labelValuePair => ({
        label: labelValuePair.getLabel(),
        values: labelValuePair.getValues(),
      }));

    const collections = manifest.getCollections();

    const currentFilter = filter || (collections.length > 0 ? 'collections' : 'manifests');

    return (
      <Dialog
        className={classes.dialog}
        onClose={this.hideDialog}
        container={document.querySelector(`#${containerId} #${windowId}`)}
        BackdropProps={this.backdropProps()}
        open
      >
        <DialogTitle id="select-collection" disableTypography>
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
                  <MenuItem key={c.id} onClick={() => { this.selectCollection(c); }}>
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
                  <MenuItem key={m.id} onClick={() => { this.selectManifest(m); }}>
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
  containerId: PropTypes.string,
  error: PropTypes.string,
  hideCollectionDialog: PropTypes.func.isRequired,
  hideWindowCollectionDialog: PropTypes.func.isRequired,
  isMultipart: PropTypes.bool,
  manifest: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  manifestId: PropTypes.string.isRequired,
  ready: PropTypes.bool,
  setWorkspaceAddVisibility: PropTypes.func.isRequired,
  showCollectionDialog: PropTypes.func.isRequired,
  showWindowCollectionDialog: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  updateWindow: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['window', 'workspace']),
  windowId: PropTypes.string,
};

CollectionDialog.defaultProps = {
  collection: null,
  collectionPath: [],
  containerId: null,
  error: null,
  isMultipart: false,
  ready: false,
  variant: 'workspace',
  windowId: null,
};
