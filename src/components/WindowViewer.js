import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OSDViewer from '../containers/OpenSeadragonViewer';
import WindowCanvasNavigationControls from '../containers/WindowCanvasNavigationControls';
import ManifestoCanvas from '../lib/ManifestoCanvas';
import CanvasGroupings from '../lib/CanvasGroupings';

/**
 * Represents a WindowViewer in the mirador workspace. Responsible for mounting
 * OSD and Navigation
 */
export class WindowViewer extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    const { canvases, window } = this.props;
    this.canvases = canvases;
    this.canvasGroupings = new CanvasGroupings(this.canvases, window.view);
  }

  /**
   * componentDidMount - React lifecycle method
   * Request the initial canvas on mount
   */
  componentDidMount() {
    const { fetchInfoResponse, fetchAnnotation } = this.props;

    if (!this.infoResponseIsInStore()) {
      this.currentCanvases().forEach((canvas) => {
        const manifestoCanvas = new ManifestoCanvas(canvas);
        const { imageInformationUri } = manifestoCanvas;
        if (imageInformationUri) {
          fetchInfoResponse(imageInformationUri);
        }
        manifestoCanvas.annotationListUris.forEach((uri) => {
          fetchAnnotation(manifestoCanvas.canvas.id, uri);
        });
      });
    }
  }

  /**
   * componentDidUpdate - React lifecycle method
   * Request a new canvas if it is needed
   */
  componentDidUpdate(prevProps) {
    const { window, fetchInfoResponse, fetchAnnotation } = this.props;
    if (prevProps.window.view !== window.view
      || (prevProps.window.canvasIndex !== window.canvasIndex && !this.infoResponseIsInStore())
    ) {
      this.currentCanvases().forEach((canvas) => {
        const manifestoCanvas = new ManifestoCanvas(canvas);
        const { imageInformationUri } = manifestoCanvas;
        if (imageInformationUri) {
          fetchInfoResponse(imageInformationUri);
        }
        manifestoCanvas.annotationListUris.forEach((uri) => {
          fetchAnnotation(manifestoCanvas.canvas.id, uri);
        });
      });
    }
    // If the view changes, create a new instance
    if (prevProps.window.view !== window.view) {
      this.canvasGroupings = new CanvasGroupings(this.canvases, window.view);
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
   * Uses CanvasGroupings to figure out how many and what canvases to present to
   * a user based off of the view, number of canvases, and canvasIndex.
   */
  currentCanvases() {
    const { window } = this.props;
    return this.canvasGroupings.getCanvases(window.canvasIndex);
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
          currentCanvases={this.currentCanvases()}
          windowId={window.id}
        >
          <WindowCanvasNavigationControls windowId={window.id} canvases={this.canvases} />
        </OSDViewer>
      </>
    );
  }
}

WindowViewer.propTypes = {
  canvases: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  fetchAnnotation: PropTypes.func.isRequired,
  fetchInfoResponse: PropTypes.func.isRequired,
  infoResponses: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
