import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ErrorIcon from '@material-ui/icons/ErrorOutlineSharp';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

/**
 * ManifestListItemError renders a component displaying a
 * message to the user about a problem loading a manifest
*/
export class ManifestListItemError extends Component {
  /** */
  constructor(props) {
    super(props);
    this.onDismissClick = this.onDismissClick.bind(this);
    this.onTryAgainClick = this.onTryAgainClick.bind(this);
  }

  /** */
  onDismissClick() {
    const { onDismissClick, manifestId } = this.props;
    onDismissClick(manifestId);
  }

  /** */
  onTryAgainClick() {
    const { onTryAgainClick, manifestId } = this.props;
    onTryAgainClick(manifestId);
  }

  /**
   * Returns the rendered component
  */
  render() {
    const {
      classes, manifestId, t,
    } = this.props;

    return (
      <Grid container>
        <Grid container>
          <Grid container item xs={12} sm={6}>
            <Grid item xs={4} sm={3}>
              <Grid container justify="center">
                <ErrorIcon className={classes.errorIcon} />
              </Grid>
            </Grid>
            <Grid item xs={8} sm={9}>
              <Typography>{t('manifestError')}</Typography>
              <Typography className={classes.manifestIdText}>{manifestId}</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid container item xs={12} sm={6} justify="flex-end">
            <Grid item>
              <Button onClick={this.onDismissClick}>
                {t('dismiss')}
              </Button>
              <Button onClick={this.onTryAgainClick}>
                {t('tryAgain')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}


ManifestListItemError.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  manifestId: PropTypes.string.isRequired,
  onDismissClick: PropTypes.func.isRequired,
  onTryAgainClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};
