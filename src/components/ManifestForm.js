import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from '../../index';

class ManifestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: '',
    };

    this.formSubmit = this.formSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  formSubmit(event) {
    event.preventDefault();
    this.props.fetchManifest(this.state.formValue);
    this.props.setLastRequested(this.state.formValue);
  }

  handleInputChange(event) {
    const that = this;
    event.preventDefault();
    that.setState({
      formValue: event.target.value,
    });
  }


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

const mapStateToProps = () => (
  {}
);


const mapDispatchToProps = dispatch => ({
  fetchManifest: manifestUrl => (
    dispatch(actions.fetchManifest(manifestUrl))
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManifestForm);
