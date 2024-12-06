import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ViewListIcon from '@mui/icons-material/ViewListSharp';
import CollapsibleSection from '../containers/CollapsibleSection';

/**
 * CollectionInfo
 */
export function CollectionInfo({
  collectionLabel = null, collectionPath = [], id, showCollectionDialog, t = k => k, windowId = null,
}) {
  /**
   * Show the containing collection.
   */
  const openCollectionDialog = () => {
    const manifestId = collectionPath[collectionPath.length - 1];

    showCollectionDialog(manifestId, collectionPath.slice(0, -1), windowId);
  };

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
        onClick={openCollectionDialog}
        startIcon={<ViewListIcon />}
      >
        {t('showCollection')}
      </Button>
    </CollapsibleSection>
  );
}

CollectionInfo.propTypes = {
  collectionLabel: PropTypes.string,
  collectionPath: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string.isRequired,
  showCollectionDialog: PropTypes.func.isRequired,
  t: PropTypes.func,
  windowId: PropTypes.string,
};
