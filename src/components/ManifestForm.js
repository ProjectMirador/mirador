import { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

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
    this.handleCancel = this.handleCancel.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Reset the form state
   */
  handleCancel() {
    const { onCancel } = this.props;

    onCancel();
    this.setState({ formValue: '' });
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
   * formSubmit - triggers manifest update and sets lastRequested
   * @param  {Event} event
   * @private
   */
  formSubmit(event) {
    const { addResource, onSubmit } = this.props;
    const { formValue } = this.state;
    event.preventDefault();
    onSubmit();
    addResource(formValue);
    this.setState({ formValue: '' });
  }

  /**
   * render
   * @return {String} - HTML markup for the component
   */
  render() {
    const { formValue } = this.state;
    const {
      addResourcesOpen,
      onCancel,
      t,
    } = this.props;
    if (!addResourcesOpen) return null;

    return (
      <form onSubmit={this.formSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={9}>
            <TextField
              autoFocus
              fullWidth
              value={formValue}
              id="manifestURL"
              type="text"
              onChange={this.handleInputChange}
              variant="filled"
              label={t('addManifestUrl')}
              helperText={t('addManifestUrlHelp')}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                style: { typography: 'body1' },
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            sx={{
              textAlign: { sm: 'inherit', xs: 'right' },
            }}
          >
            { onCancel && (
              <Button onClick={this.handleCancel}>
                {t('cancel')}
              </Button>
            )}
            <Button id="fetchBtn" type="submit" variant="contained" color="primary">
              {t('fetchManifest')}
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

ManifestForm.propTypes = {
  addResource: PropTypes.func.isRequired,
  addResourcesOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  t: PropTypes.func,
};

ManifestForm.defaultProps = {
  onCancel: null,
  onSubmit: () => {},
  t: key => key,
};
