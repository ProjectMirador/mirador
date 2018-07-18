import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import m3core from '../../../index.umd';
import Display from './Display';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: '',
      lastRequested: '',
    };
    this.formSubmit = this.formSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  computedContent() {
    const manifest = this.props.manifests[this.state.lastRequested];
    if (manifest) {
      if (manifest.isFetching) {
        return '☕';
      } else if (manifest.error) {
        return manifest.error.message;
      }
      return JSON.stringify(manifest.json, 0, 2);
    }
    return 'Nothing Selected Yet';
  }

  formSubmit(event) {
    event.preventDefault();
    this.props.fetchManifest(this.state.formValue);
    this.setState({
      lastRequested: this.state.formValue,
    });
  }
  handleInputChange(event) {
    const that = this;
    event.preventDefault();
    that.setState({
      formValue: event.target.value,
    });
  }
  render() {
    const manifestList = Object.keys(this.props.manifests).map(manifest => (
      <li key={manifest}>{manifest}</li>
    ));
    return (
      <div className="App">
        <form onSubmit={this.formSubmit}>
          <input
            value={this.state.formValue}
            id="manifestURL"
            type="text"
            onChange={this.handleInputChange}
          />

          <button id="fetchBtn" type="submit">FetchManifest</button>
          <ul>{manifestList}</ul>

          <Display
            manifest={this.props.manifests[this.state.lastRequested]}
          />
        </form>
      </div>
    );
  }
}

App.propTypes = {
  fetchManifest: PropTypes.func.isRequired,
  manifests: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => (
  {
    manifests: state.manifests,
  }
);

const mapDispatchToProps = dispatch => ({
  fetchManifest: manifestUrl => (
    dispatch(m3core.actions.fetchManifest(manifestUrl))
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
