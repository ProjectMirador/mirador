import { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ListSharpIcon from '@mui/icons-material/ListSharp';

/**
 *
 */
export class SelectCollection extends Component {
  /** */
  constructor(props) {
    super(props);

    this.openCollectionDialog = this.openCollectionDialog.bind(this);
  }

  /** */
  openCollectionDialog() {
    const {
      collectionPath, manifestId, showCollectionDialog, windowId,
    } = this.props;
    showCollectionDialog(manifestId, collectionPath.slice(0, -1), windowId);
  }

  /** */
  render() {
    const {
      t,
    } = this.props;
    return (
      <Grid container justifyContent="center" alignItems="center">
        <Grid container direction="column" alignItems="center">
          <Typography variant="h4" paragraph>
            <em>
              {t('noItemSelected')}
            </em>
          </Typography>
          <Button
            aria-label="show collection"
            color="primary"
            variant="contained"
            onClick={this.openCollectionDialog}
            startIcon={<ListSharpIcon />}
          >
            {t('showCollection')}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

SelectCollection.propTypes = {
  collectionPath: PropTypes.arrayOf(PropTypes.string),
  manifestId: PropTypes.string,
  showCollectionDialog: PropTypes.func.isRequired,
  t: PropTypes.func,
  windowId: PropTypes.string,
};

SelectCollection.defaultProps = {
  collectionPath: [],
  manifestId: null,
  t: () => {},
  windowId: null,
};
