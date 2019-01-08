import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OpenSeaDragon from 'openseadragon';
import fetch from 'node-fetch';
import miradorWithPlugins from '../lib/miradorWithPlugins';
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

    this.ref = React.createRef();
    this.viewer = null;
  }

  /**
   * React lifecycle event
   */
  componentDidMount() {
    const { manifest } = this.props;
    if (!this.ref.current) {
      return false;
    }
    this.viewer = OpenSeaDragon({
      id: this.ref.current.id,
      showNavigationControl: false,
    });
    const that = this;
    fetch(`${manifest.manifestation.getSequences()[0].getCanvases()[0].getImages()[0].getResource().getServices()[0].id}/info.json`)
      .then(response => response.json())
      .then((json) => {
        that.viewer.addTiledImage({
          tileSource: json,
          success: (event) => {
            const tiledImage = event.item;

            /**
             * A callback for the tile after its drawn
             * @param  {[type]} e event object
             */
            const tileDrawnHandler = (e) => {
              if (e.tiledImage === tiledImage) {
                that.viewer.removeHandler('tile-drawn', tileDrawnHandler);
                that.ref.current.style.display = 'block';
              }
            };
            that.viewer.addHandler('tile-drawn', tileDrawnHandler);
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
        ref={this.ref}
      />
    );
  }
}

WindowViewer.propTypes = {
  manifest: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default miradorWithPlugins(WindowViewer);
