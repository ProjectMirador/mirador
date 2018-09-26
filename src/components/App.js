import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from '../store';
import Display from './Display';
import ManifestForm from './ManifestForm';
import ManifestListItem from './ManifestListItem';
import Workspace from './Workspace';

/**
 * This is the top level Mirador component.
 * @prop {Object} manifests
 */
class App extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);
    this.state = {
      lastRequested: '',
    };

    this.setLastRequested = this.setLastRequested.bind(this);
  }

  /**
   * setLastRequested - Sets the state lastRequested
   *
   * @private
   */
  setLastRequested(requested) {
    this.setState({
      lastRequested: requested,
    });
  }

  /**
   * computedContent - computes the content to be displayed based on logic
   *
   * @return {type}  description
   * @private
   */
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

  /**
   * render
   * @return {String} - HTML markup for the component
   */
  render() {
    const manifestList = Object.keys(this.props.manifests).map(manifest => (
      <ManifestListItem
        key={manifest}
        manifest={manifest}
      />
    ));
    return (
      <div className="App">
        <ManifestForm setLastRequested={this.setLastRequested} />
        <ul>{manifestList}</ul>

        <Display
          manifest={this.props.manifests[this.state.lastRequested]}
        />
        <Workspace />
      </div>
    );
  }
}

App.propTypes = {
  manifests: PropTypes.instanceOf(Object).isRequired,
};

/**
 * mapStateToProps - to hook up connect
 * @memberof App
 * @private
 */
const mapStateToProps = state => (
  {
    manifests: state.manifests,
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof App
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
)(App);
