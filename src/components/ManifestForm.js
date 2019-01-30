import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../state/actions';

/**
 * Provides a form for user input of a manifest url
 * @prop {Function} fetchManifest
 * @prop {Function} setLastRequested
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
    const { fetchManifest, setLastRequested } = this.props;
    const { formValue } = this.state;
    event.preventDefault();
    fetchManifest(formValue);
    setLastRequested(formValue);
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
    return (
      <form onSubmit={this.formSubmit}>
        <input
          value={formValue}
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
const mapDispatchToProps = { fetchManifest: actions.fetchManifest };

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  // further HOC go here
);

export default enhance(ManifestForm);
