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

    this.inputRef = React.createRef();
    this.formSubmit = this.formSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   *
   * @param {*} prevProps
   * @param {*} prevState
   */
  componentDidUpdate() {
    const { addResourcesOpen } = this.props;
    if (this.inputRef && this.inputRef.current && addResourcesOpen) {
      this.inputRef.current.focus();
    }
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
   * render
   * @return {String} - HTML markup for the component
   */
  render() {
    const { formValue } = this.state;
    const {
      classes,
      onCancel,
      t,
    } = this.props;
    return (
      <form onSubmit={this.formSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={9}>
            <TextField
              inputRef={this.inputRef}
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
                className: classes.input,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3} className={classes.buttons}>
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
  classes: PropTypes.objectOf(PropTypes.string),
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  t: PropTypes.func,
};

ManifestForm.defaultProps = {
  classes: {},
  onCancel: null,
  onSubmit: () => {},
  t: key => key,
};
