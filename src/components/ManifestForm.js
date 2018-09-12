import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from '../store';

/**
 * Provides a form for user input of a manifest url
 * @prop {Function} fetchManifest
 * @prop {Function} setLastRequested
 */
class ManifestForm extends Component {
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
    event.preventDefault();
    this.props.fetchManifest(this.state.formValue);
    this.props.setLastRequested(this.state.formValue);
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
    return (
      <form onSubmit={this.formSubmit}>
        <input
          value={this.state.formValue}
          id="manifestURL"
          type="text"
          onChange={this.handleInputChange}
        />
        <button id="fetchBtn" type="submit">FetchManifest</button>
      </form>
    );
  }
}

ManifestForm.propTypes = {
  fetchManifest: PropTypes.func.isRequired,
  setLastRequested: PropTypes.func.isRequired,
};

/**
 * mapStateToProps - to hook up connect
 * @memberof ManifestForm
 * @private
 */
const mapStateToProps = () => (
  {}
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestForm
 * @private
 */
const mapDispatchToProps = dispatch => ({
  fetchManifest: manifestUrl => (
    dispatch(actions.fetchManifest(manifestUrl))
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManifestForm);
