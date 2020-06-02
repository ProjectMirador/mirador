import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ViewListIcon from '@material-ui/icons/ViewListSharp';
import CollapsibleSection from '../containers/CollapsibleSection';


/**
 * ManifestInfo
 */
export class CollectionInfo extends Component {
  /** */
  constructor(props) {
    super(props);

    this.openCollectionDialog = this.openCollectionDialog.bind(this);
  }

  /** */
  openCollectionDialog() {
    const { collectionPath, showCollectionDialog, windowId } = this.props;

    const manifestId = collectionPath[collectionPath.length - 1];

    showCollectionDialog(manifestId, collectionPath.slice(0, -1), windowId);
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      collectionLabel,
      collectionPath,
      id,
      t,
    } = this.props;

    if (collectionPath.length === 0) return null;

    return (
      <CollapsibleSection
        id={`${id}-collection`}
        label={t('collection')}
      >
        {collectionLabel && (
          <Typography
            aria-labelledby={`${id}-resource ${id}-resource-heading`}
            id={`${id}-resource-heading`}
            variant="h4"
          >
            {collectionLabel}
          </Typography>
        )}

        <Button
          color="primary"
          onClick={this.openCollectionDialog}
          startIcon={<ViewListIcon />}
        >
          {t('showCollection')}
        </Button>
      </CollapsibleSection>
    );
  }
}

CollectionInfo.propTypes = {
  collectionLabel: PropTypes.string,
  collectionPath: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string.isRequired,
  showCollectionDialog: PropTypes.func.isRequired,
  t: PropTypes.func,
  windowId: PropTypes.string,
};

CollectionInfo.defaultProps = {
  collectionLabel: null,
  collectionPath: [],
  t: key => key,
  windowId: null,
};
