import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import OpenSeadragon from 'openseadragon';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { actions } from '../store';
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
    const { tileSources, setZooming, window } = this.props;
    if (!this.ref.current) {
      return;
    }
    this.viewer = new OpenSeadragon({
      id: this.ref.current.id,
      preserveViewport: true,
      blendTime: 0.1,
      alwaysBlend: false,
      showNavigationControl: false,
    });
    tileSources.forEach(tileSource => this.addTileSource(tileSource));
    this.viewer.addHandler('zoom', (e) => {
      // setZooming({ zoom: e.zoom, windowId: window.id });
    });
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
      success: (event) => {
      },
    });
  }

  /**
   * Renders things
   */
  render() {
    const { window } = this.props;
    return (
      <Fragment>
        <div
          className={ns('osd-container')}
          id={`${window.id}-osd`}
          ref={this.ref}
        />
      </Fragment>
    );
  }
}

OpenSeadragonViewer.defaultProps = {
  tileSources: [],
};

OpenSeadragonViewer.propTypes = {
  tileSources: PropTypes.arrayOf(PropTypes.object),
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  setZooming: PropTypes.func.isRequired,
};

/**
 * mapStateToProps - to hook up connect
 * @memberof OpenSeadragonViewer
 * @private
 */
const mapStateToProps = state => ({});

const mapDispatchToProps = { setZooming: actions.setZooming };

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  miradorWithPlugins,
);

export default enhance(OpenSeadragonViewer);
