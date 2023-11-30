import { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpwardSharp';
import CompanionWindow from '../containers/CompanionWindow';
import IIIFThumbnail from '../containers/IIIFThumbnail';

/** */
function Item({
  manifest, canvasNavigation, variant, ...otherProps
}) {
  return (
    <MenuItem
      alignItems="flex-start"
      button
      divider
      component="li"
      variant="multiline"
      sx={{
        paddingRight: 1,
      }}
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
}

Item.propTypes = {
  canvasNavigation: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
  manifest: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  variant: PropTypes.string.isRequired,
};

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
              { isFetching && <Skeleton variant="text" />}
            </Typography>
          </>
        )}
      >
        <MenuList>
          { isFetching && (
            <MenuItem>
              <ListItemText>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
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
                <Item
                  key={manifest.id}
                  onClick={onClick}
                  canvasNavigation={canvasNavigation}
                  manifest={manifest}
                  variant={variant}
                  selected={manifestId === manifest.id}
                />
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
                <Item
                  key={manifest.id}
                  onClick={onClick}
                  canvasNavigation={canvasNavigation}
                  manifest={manifest}
                  variant={variant}
                  selected={manifestId === manifest.id}
                />
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
  collection: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  collectionPath: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string.isRequired,
  isFetching: PropTypes.bool,
  manifestId: PropTypes.string.isRequired,
  parentCollection: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
  updateCompanionWindow: PropTypes.func.isRequired,
  updateWindow: PropTypes.func.isRequired,
  variant: PropTypes.string,
  windowId: PropTypes.string.isRequired,
};

WindowSideBarCollectionPanel.defaultProps = {
  collection: null,
  collectionPath: [],
  isFetching: false,
  parentCollection: null,
  t: k => k,
  variant: null,
};
