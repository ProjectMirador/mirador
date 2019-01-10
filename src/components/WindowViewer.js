import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import fetch from 'node-fetch';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import OpenSeadragonViewer from './OpenSeadragonViewer';
import ViewerNavigation from './ViewerNavigation';

/**
 * Represents a WindowViewer in the mirador workspace. Responsible for mounting
 * OSD and Navigation
 */
class WindowViewer extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    const { manifest } = this.props;
    this.canvases = manifest.manifestation.getSequences()[0].getCanvases();
    this.state = {
      tileSources: [],
    };
  }

  /**
   * componentDidMount - React lifecycle method
   * Request the initial canvas on mount
   */
  componentDidMount() {
    this.requestAndUpdateTileSources();
  }

  /**
   * componentDidUpdate - React lifecycle method
   * Request a new canvas if it is needed
   */
  componentDidUpdate(prevProps) {
    const { window } = this.props;
    if (prevProps.window.canvasIndex !== window.canvasIndex) {
      this.requestAndUpdateTileSources();
    }
  }

  /**
   */
  requestAndUpdateTileSources() {
    const { window } = this.props;
    fetch(`${this.canvases[window.canvasIndex].getImages()[0].getResource().getServices()[0].id}/info.json`)
      .then(response => response.json())
      .then((json) => {
        this.setState({
          tileSources: [json],
        });
      });
  }

  /**
   * Renders things
   */
  render() {
    const { window } = this.props;
    const { tileSources } = this.state;
    return (
      <Fragment>
        <OpenSeadragonViewer tileSources={tileSources} window={window} />
        <ViewerNavigation window={window} canvases={this.canvases} />
      </Fragment>
    );
  }
}

WindowViewer.propTypes = {
  manifest: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default miradorWithPlugins(WindowViewer);
