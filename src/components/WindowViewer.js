import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '../store';
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
  }

  /**
   * componentDidMount - React lifecycle method
   * Request the initial canvas on mount
   */
  componentDidMount() {
    const { fetchInfoResponse } = this.props;
    fetchInfoResponse(this.imageInformationUri());
  }

  /**
   * componentDidUpdate - React lifecycle method
   * Request a new canvas if it is needed
   */
  componentDidUpdate(prevProps) {
    const { window, fetchInfoResponse } = this.props;
    if (prevProps.window.canvasIndex !== window.canvasIndex && !this.infoResponseIsInStore()) {
      fetchInfoResponse(this.imageInformationUri());
    }
  }

  /**
   * infoResponseIsInStore - checks whether or not an info response is already
   * in the store. No need to request it again.
   * @return [Boolean]
   */
  infoResponseIsInStore() {
    const { infoResponses } = this.props;
    const currentInfoResponse = infoResponses[this.imageInformationUri()];
    return (currentInfoResponse !== undefined
      && currentInfoResponse.isFetching === false
      && currentInfoResponse.json !== undefined);
  }

  /**
   * Constructs an image information URI to request from a canvas
   */
  imageInformationUri() {
    const { window } = this.props;
    return `${this.canvases[window.canvasIndex].getImages()[0].getResource().getServices()[0].id}/info.json`;
  }

  /**
   * Return an image information response from the store for the correct image
   */
  tileInfoFetchedFromStore() {
    const { infoResponses } = this.props;
    return [infoResponses[this.imageInformationUri()]]
      .filter(infoResponse => (infoResponse !== undefined
        && infoResponse.isFetching === false
        && infoResponse.error === undefined))
      .map(infoResponse => infoResponse.json);
  }

  /**
   * Renders things
   */
  render() {
    const { window } = this.props;
    return (
      <Fragment>
        <OpenSeadragonViewer
          tileSources={this.tileInfoFetchedFromStore()}
          window={window}
        />
        <ViewerNavigation window={window} canvases={this.canvases} />
      </Fragment>
    );
  }
}

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = state => (
  {
    infoResponses: state.infoResponses,
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof WindowViewer
 * @private
 */
const mapDispatchToProps = dispatch => ({
  fetchInfoResponse: infoId => dispatch(actions.fetchInfoResponse(infoId)),
});

WindowViewer.propTypes = {
  infoResponses: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  fetchInfoResponse: PropTypes.func.isRequired,
  manifest: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default connect(mapStateToProps, mapDispatchToProps)(miradorWithPlugins(WindowViewer));
