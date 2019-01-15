import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import OpenSeadragon from 'openseadragon';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import ns from '../config/css-ns';

/**
 * Represents a OpenSeadragonViewer in the mirador workspace. Responsible for mounting
 * and rendering OSD.
 */
class OpenSeadragonViewer extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.viewer = null;
    this.ref = React.createRef();
  }

  /**
   * React lifecycle event
   */
  componentDidMount() {
    const { tileSources } = this.props;
    if (!this.ref.current) {
      return;
    }
    this.viewer = new OpenSeadragon({
      id: this.ref.current.id,
      preserveViewport: true,
      blendTime: 0.1,
      alwaysBlend: false,
      showNavigationControl: false
    });
    tileSources.forEach(tileSource => this.addTileSource(tileSource));
  }

  /**
   * When the tileSources change, make sure to close the OSD viewer.
   */
  componentDidUpdate(prevProps) {
    const { tileSources } = this.props;
    if (prevProps.tileSources !== tileSources) {
      this.viewer.close();
      tileSources.forEach(tileSource => this.addTileSource(tileSource));
    }
  }

  /**
   */
  componentWillUnmount() {
    this.viewer.removeAllHandlers();
  }

  /**
   */
  addTileSource(tileSource) {
    this.viewer.addTiledImage({
      tileSource,
      success: event => {}
    });
  }

  /**
   * Renders things
   */
  render() {
    const { window } = this.props;
    return (
      <Fragment>
        <div className={ns('osd-container')} id={`${window.id}-osd`} ref={this.ref} />
      </Fragment>
    );
  }
}

OpenSeadragonViewer.defaultProps = {
  tileSources: []
};

OpenSeadragonViewer.propTypes = {
  tileSources: PropTypes.arrayOf(PropTypes.object),
  window: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default miradorWithPlugins(OpenSeadragonViewer);
