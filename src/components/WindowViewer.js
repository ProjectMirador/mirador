import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OpenSeaDragon from 'openseadragon';
import fetch from 'node-fetch';
import ns from '../config/css-ns';

/**
 * Represents a WindowViewer in the mirador workspace. Responsible for mounting
 * and rendering OSD.
 */
class WindowViewer extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.miradorInstanceRef = React.createRef();
  }

  /**
   * React lifecycle event
   */
  componentDidMount() {
    const { manifest } = this.props;
    if (!this.miradorInstanceRef.current) {
      return false;
    }
    const viewer = OpenSeaDragon({
      id: this.miradorInstanceRef.current.id,
      showNavigationControl: false,
    });
    const that = this;
    fetch(`${manifest.manifestation.getSequences()[0].getCanvases()[0].getImages()[0].getResource().getServices()[0].id}/info.json`)
      .then(response => response.json())
      .then((json) => {
        viewer.addTiledImage({
          tileSource: json,
          success: (event) => {
            const tiledImage = event.item;

            /**
             * A callback for the tile after its drawn
             * @param  {[type]} e event object
             */
            const tileDrawnHandler = (e) => {
              if (e.tiledImage === tiledImage) {
                viewer.removeHandler('tile-drawn', tileDrawnHandler);
                that.miradorInstanceRef.current.style.display = 'block';
              }
            };
            viewer.addHandler('tile-drawn', tileDrawnHandler);
          },
        });
      })
      .catch(error => console.log(error));
    return false;
  }

  /**
   * Renders things
   */
  render() {
    const { window } = this.props;
    return (
      <div
        className={ns('osd-container')}
        style={{ display: 'none' }}
        id={`${window.id}-osd`}
        ref={this.miradorInstanceRef}
      />
    );
  }
}

WindowViewer.propTypes = {
  manifest: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default WindowViewer;
