import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from '../index';
import Display from './Display';
import ManifestForm from './ManifestForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastRequested: '',
    };

    this.setLastRequested = this.setLastRequested.bind(this);
  }

  setLastRequested(requested) {
    this.setState({
      lastRequested: requested,
    });
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

  render() {
    const manifestList = Object.keys(this.props.manifests).map(manifest => (
      <li key={manifest}>{manifest}</li>
    ));
    return (
      <div className="App">
        <ManifestForm setLastRequested={this.setLastRequested} />
        <ul>{manifestList}</ul>

        <Display
          manifest={this.props.manifests[this.state.lastRequested]}
        />
      </div>
    );
  }
}

App.propTypes = {
  manifests: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => (
  {
    manifests: state.manifests,
  }
);

const mapDispatchToProps = dispatch => ({
  fetchManifest: manifestUrl => (
    dispatch(actions.fetchManifest(manifestUrl))
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
