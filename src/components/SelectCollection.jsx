import { useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListSharpIcon from '@mui/icons-material/ListSharp';
import { useTranslation } from 'react-i18next';

/**
 *
 */
export function SelectCollection({
  collectionPath = [], manifestId = null, showCollectionDialog, windowId = null,
}) {
  const { t } = useTranslation();
  const openCollectionDialog = useCallback(() => {
    showCollectionDialog(manifestId, collectionPath.slice(0, -1), windowId);
  }, [collectionPath, manifestId, showCollectionDialog, windowId]);

  return (
    <Grid container sx={{ width: '100%', alignContent: 'center', justifyContent: 'center' }}>
      <Stack>
        <Typography variant="h4" component="p" sx={{ textAlign: 'center', mb: 2 }}>
          <em>
            {t('noItemSelected')}
          </em>
        </Typography>
        <Button
          aria-label="show collection"
          color="primary"
          variant="contained"
          onClick={openCollectionDialog}
          startIcon={<ListSharpIcon />}
        >
          {t('showCollection')}
        </Button>
      </Stack>
    </Grid>
  );
}

SelectCollection.propTypes = {
  collectionPath: PropTypes.arrayOf(PropTypes.string),
  manifestId: PropTypes.string,
  showCollectionDialog: PropTypes.func.isRequired,
  windowId: PropTypes.string,
};
