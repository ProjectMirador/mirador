import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OSDViewer from '../containers/OpenSeadragonViewer';
import ViewerNavigation from '../containers/ViewerNavigation';
import ManifestoCanvas from '../lib/ManifestoCanvas';

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
  }

  /**
   * componentDidMount - React lifecycle method
   * Request the initial canvas on mount
   */
  componentDidMount() {
    const { fetchInfoResponse } = this.props;

    if (!this.infoResponseIsInStore()) {
      this.currentCanvases().forEach((canvas) => {
        fetchInfoResponse(new ManifestoCanvas(canvas).imageInformationUri);
      });
    }
  }

  /**
   * componentDidUpdate - React lifecycle method
   * Request a new canvas if it is needed
   */
  componentDidUpdate(prevProps) {
    const { window, fetchInfoResponse } = this.props;
    if (prevProps.window.view !== window.view
      || (prevProps.window.canvasIndex !== window.canvasIndex && !this.infoResponseIsInStore())
    ) {
      this.currentCanvases().forEach((canvas) => {
        fetchInfoResponse(new ManifestoCanvas(canvas).imageInformationUri);
      });
    }
  }

  /**
   * infoResponseIsInStore - checks whether or not an info response is already
   * in the store. No need to request it again.
   * @return [Boolean]
   */
  infoResponseIsInStore() {
    const responses = this.currentInfoResponses();
    if (responses.length === this.currentCanvases().length) {
      return true;
    }
    return false;
  }

  /**
   * Figures out how many and what canvases to present to a user based off of
   * the view, number of canvases, and canvasIndex.
   */
  currentCanvases() {
    const { window } = this.props;
    switch (window.view) {
      case 'book':
        if ( // FIXME: There is probably better logic floating around out there to determine this.
          this.canvases.length > 0 // when there are canvases present
          && window.canvasIndex !== 0 // when the first canvas is not selected
          && window.canvasIndex + 1 !== this.canvases.length // when the last canvas is not selected
        ) {
          // For an even canvas
          if (window.canvasIndex % 2 === 0) {
            return [this.canvases[window.canvasIndex - 1], this.canvases[window.canvasIndex]];
          }
          return [this.canvases[window.canvasIndex], this.canvases[window.canvasIndex + 1]];
        }
        return [this.canvases[window.canvasIndex]];
      default:
        return [this.canvases[window.canvasIndex]];
    }
  }

  /**
   * currentInfoResponses - Selects infoResponses that are relevent to existing
   * canvases to be displayed.
   */
  currentInfoResponses() {
    const { infoResponses } = this.props;
    const currentCanvases = this.currentCanvases();
    return currentCanvases.map(canvas => (
      infoResponses[new ManifestoCanvas(canvas).imageInformationUri]
    )).filter(infoResponse => (infoResponse !== undefined
      && infoResponse.isFetching === false
      && infoResponse.error === undefined));
  }

  /**
   * Return an image information response from the store for the correct image
   */
  tileInfoFetchedFromStore() {
    const responses = this.currentInfoResponses()
      .map(infoResponse => infoResponse.json);
    // Only return actual tileSources when all current canvases have completed.
    if (responses.length === this.currentCanvases().length) {
      return responses;
    }
    return [];
  }

  /**
   * Renders things
   */
  render() {
    const { window } = this.props;
    return (
      <>
        <OSDViewer
          tileSources={this.tileInfoFetchedFromStore()}
          windowId={window.id}
        >
          <ViewerNavigation window={window} canvases={this.canvases} />
        </OSDViewer>
      </>
    );
  }
}

WindowViewer.propTypes = {
  infoResponses: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  fetchInfoResponse: PropTypes.func.isRequired,
  manifest: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default WindowViewer;
