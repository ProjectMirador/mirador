import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
    this.handleCancel = this.handleCancel.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setInputRef = this.setInputRef.bind(this);
  }

  /**
   *
   * @param {*} prevProps
   * @param {*} prevState
   */
  componentDidUpdate() {
    const { addResourcesOpen } = this.props;
    if (this.input && addResourcesOpen) {
      ReactDOM.findDOMNode(this.input).querySelector('#manifestURL').focus();// eslint-disable-line react/no-find-dom-node
    }
  }

  /**
   * Set the ref to the manifest input
   * @param {*} input
   */
  setInputRef(input) {
    if (this.input) return;

    this.input = input;
  }

  /**
   * formSubmit - triggers manifest update and sets lastRequested
   * @param  {Event} event
   * @private
   */
  formSubmit(event) {
    const { fetchManifest, onSubmit } = this.props;
    const { formValue } = this.state;
    event.preventDefault();
    onSubmit();
    fetchManifest(formValue);
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
        <Grid container spacing={24}>
          <Grid item xs={12} sm={8} md={9}>
            <TextField
              ref={ref => this.setInputRef(ref)}
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
  addResourcesOpen: PropTypes.bool.isRequired,
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  fetchManifest: PropTypes.func.isRequired,
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
