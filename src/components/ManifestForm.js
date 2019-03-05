import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

/**
 * Provides a form for user input of a manifest url
 * @prop {Function} fetchManifest
 */
export class ManifestForm extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);
    this.state = {
      formValue: '',
    };

    this.formSubmit = this.formSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * formSubmit - triggers manifest update and sets lastRequested
   * @param  {Event} event
   * @private
   */
  formSubmit(event) {
    const { fetchManifest } = this.props;
    const { formValue } = this.state;
    event.preventDefault();
    fetchManifest(formValue);
  }

  /**
   * handleInputChange - sets state based on input change.
   * @param  {Event} event
   * @private
   */
  handleInputChange(event) {
    const that = this;
    event.preventDefault();
    that.setState({
      formValue: event.target.value,
    });
  }

  /**
   * render
   * @return {String} - HTML markup for the component
   */
  render() {
    const { formValue } = this.state;
    const { t, onCancel } = this.props;
    return (
      <form onSubmit={this.formSubmit}>
        <Grid container spacing={24}>
          <Grid item sm={9}>
            <TextField
              fullWidth
              value={formValue}
              id="manifestURL"
              type="text"
              onChange={this.handleInputChange}
              variant="filled"
              label={t('addManifestUrl')}
              helperText={t('addManifestUrlHelp')}
            />
          </Grid>
          <Grid item sm={3}>
            { onCancel && (
              <Button onClick={onCancel}>
                {t('cancel')}
              </Button>
            )}
            <Button id="fetchBtn" type="submit" variant="contained" color="secondary">
              {t('fetchManifest')}
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

ManifestForm.propTypes = {
  fetchManifest: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  t: PropTypes.func.isRequired,
};

ManifestForm.defaultProps = {
  onCancel: null,
};
