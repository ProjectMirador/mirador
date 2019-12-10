import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OSDViewer from '../containers/OpenSeadragonViewer';
import WindowCanvasNavigationControls from '../containers/WindowCanvasNavigationControls';
import ManifestoCanvas from '../lib/ManifestoCanvas';

/**
 * Represents a WindowViewer in the mirador workspace. Responsible for mounting
 * OSD and Navigation
 */
export class WindowViewer extends Component {
  /** */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /** */
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  /**
   * componentDidMount - React lifecycle method
   * Request the initial canvas on mount
   */
  componentDidMount() {
    const {
      currentCanvases, fetchInfoResponse, fetchAnnotation, receiveAnnotation,
    } = this.props;

    if (!this.infoResponseIsInStore()) {
      currentCanvases.forEach((canvas) => {
        const manifestoCanvas = new ManifestoCanvas(canvas);
        const { imageResource } = manifestoCanvas;
        if (imageResource) {
          fetchInfoResponse({ imageResource });
        }
        manifestoCanvas.processAnnotations(fetchAnnotation, receiveAnnotation);
      });
    }
  }

  /**
   * componentDidUpdate - React lifecycle method
   * Request a new canvas if it is needed
   */
  componentDidUpdate(prevProps) {
    const {
      currentCanvasId, currentCanvases, view, fetchInfoResponse, fetchAnnotation, receiveAnnotation,
    } = this.props;

    if (prevProps.view !== view
      || (prevProps.currentCanvasId !== currentCanvasId && !this.infoResponseIsInStore())
    ) {
      currentCanvases.forEach((canvas) => {
        const manifestoCanvas = new ManifestoCanvas(canvas);
        const { imageResource } = manifestoCanvas;
        if (imageResource) {
          fetchInfoResponse({ imageResource });
        }
        manifestoCanvas.processAnnotations(fetchAnnotation, receiveAnnotation);
      });
    }
  }

  /**
   * infoResponseIsInStore - checks whether or not an info response is already
   * in the store. No need to request it again.
   * @return [Boolean]
   */
  infoResponseIsInStore() {
    const { currentCanvases } = this.props;

    const responses = this.currentInfoResponses();
    if (responses.length === currentCanvases.length) {
      return true;
    }
    return false;
  }

  /**
   * currentInfoResponses - Selects infoResponses that are relevent to existing
   * canvases to be displayed.
   */
  currentInfoResponses() {
    const { currentCanvases, infoResponses } = this.props;

    return currentCanvases.map(canvas => (
      infoResponses[new ManifestoCanvas(canvas).imageId]
    )).filter(infoResponse => (infoResponse !== undefined
      && infoResponse.isFetching === false
      && infoResponse.error === undefined));
  }

  /**
   * Return an image information response from the store for the correct image
   */
  tileInfoFetchedFromStore() {
    const { currentCanvases } = this.props;

    const responses = this.currentInfoResponses()
      .map(infoResponse => infoResponse.json);
    // Only return actual tileSources when all current canvases have completed.
    if (responses.length === currentCanvases.length) {
      return responses;
    }
    return [];
  }

  /**
   * Renders things
   */
  render() {
    const { windowId } = this.props;

    const { hasError } = this.state;

    if (hasError) {
      return <></>;
    }

    return (
      <OSDViewer
        tileSources={this.tileInfoFetchedFromStore()}
        windowId={windowId}
      >
        <WindowCanvasNavigationControls key="canvas_nav" windowId={windowId} />
      </OSDViewer>
    );
  }
}

WindowViewer.propTypes = {
  currentCanvases: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  currentCanvasId: PropTypes.string.isRequired,
  fetchAnnotation: PropTypes.func.isRequired,
  fetchInfoResponse: PropTypes.func.isRequired,
  infoResponses: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  receiveAnnotation: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  windowId: PropTypes.string.isRequired,
};
