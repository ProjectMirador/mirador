import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpwardSharp';
import CompanionWindow from '../containers/CompanionWindow';
import IIIFThumbnail from '../containers/IIIFThumbnail';

/** */
export class WindowSideBarCollectionPanel extends Component {
  /** */
  static getUseableLabel(resource, index) {
    return (resource
      && resource.getLabel
      && resource.getLabel().length > 0)
      ? resource.getLabel().getValue()
      : resource.id;
  }

  /** */
  isMultipart() {
    const { collection } = this.props;

    if (!collection) return false;

    const behaviors = collection.getProperty('behavior');

    if (Array.isArray(behaviors)) return behaviors.includes('multi-part');

    return behaviors === 'multi-part';
  }

  /** */
  render() {
    const {
      canvasNavigation,
      classes,
      collectionPath,
      collection,
      id,
      isFetching,
      manifestId,
      parentCollection,
      updateCompanionWindow,
      updateWindow,
      t,
      variant,
      windowId,
    } = this.props;

    /** */
    const Item = ({ manifest, ...otherProps }) => (
      <MenuItem
        className={classes.menuItem}
        alignItems="flex-start"
        button
        component="li"
        selected={manifestId === manifest.id}
        {...otherProps}
      >
        { variant === 'thumbnail' && (
          <ListItemIcon>
            <IIIFThumbnail
              resource={manifest}
              maxHeight={canvasNavigation.height}
              maxWidth={canvasNavigation.width}
            />
          </ListItemIcon>
        )}
        <ListItemText>{WindowSideBarCollectionPanel.getUseableLabel(manifest)}</ListItemText>
      </MenuItem>
    );

    return (
      <CompanionWindow
        title={t(this.isMultipart() ? 'multipartCollection' : 'collection')}
        windowId={windowId}
        id={id}
        titleControls={(
          <>
            { parentCollection && (
              <List>
                <ListItem
                  button
                  onClick={
                    () => updateCompanionWindow({ collectionPath: collectionPath.slice(0, -1) })
                  }
                >
                  <ListItemIcon>
                    <ArrowUpwardIcon />
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{ variant: 'body1' }}>
                    {WindowSideBarCollectionPanel.getUseableLabel(parentCollection)}
                  </ListItemText>
                </ListItem>
              </List>
            )}
            <Typography variant="h6">
              { collection && WindowSideBarCollectionPanel.getUseableLabel(collection)}
              { isFetching && <Skeleton className={classes.placeholder} variant="text" />}
            </Typography>
          </>
        )}
      >
        <MenuList>
          { isFetching && (
            <MenuItem>
              <ListItemText>
                <Skeleton className={classes.placeholder} variant="text" />
                <Skeleton className={classes.placeholder} variant="text" />
                <Skeleton className={classes.placeholder} variant="text" />
              </ListItemText>
            </MenuItem>
          )}
          {
            collection && collection.getCollections().map((manifest) => {
              /** select the new manifest and go back to the normal index */
              const onClick = () => {
                // close collection
                updateCompanionWindow({ collectionPath: [...collectionPath, manifest.id] });
              };

              return (
                <Item key={manifest.id} onClick={onClick} manifest={manifest} />
              );
            })
          }
          {
            collection && collection.getManifests().map((manifest) => {
              /** select the new manifest and go back to the normal index */
              const onClick = () => {
                // select new manifest
                updateWindow({ canvasId: null, collectionPath, manifestId: manifest.id });
                // close collection
                updateCompanionWindow({ multipart: false });
              };

              return (
                <Item key={manifest.id} onClick={onClick} manifest={manifest} />
              );
            })
          }
        </MenuList>
      </CompanionWindow>
    );
  }
}

WindowSideBarCollectionPanel.propTypes = {
  canvasNavigation: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  collection: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  collectionId: PropTypes.string.isRequired,
  collectionPath: PropTypes.arrayOf(PropTypes.string),
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  isFetching: PropTypes.bool,
  manifestId: PropTypes.string.isRequired,
  parentCollection: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  ready: PropTypes.bool,
  t: PropTypes.func,
  updateCompanionWindow: PropTypes.func.isRequired,
  updateWindow: PropTypes.func.isRequired,
  variant: PropTypes.string,
  windowId: PropTypes.string.isRequired,
};

WindowSideBarCollectionPanel.defaultProps = {
  collection: null,
  collectionPath: [],
  error: null,
  isFetching: false,
  parentCollection: null,
  ready: false,
  t: k => k,
  variant: null,
};
