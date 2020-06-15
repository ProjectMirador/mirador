import React, { Component } from 'react';
import PropTypes from 'prop-types';

/** */
export class AVViewer extends Component {
  /** */
  render() {
    const { currentCanvases } = this.props;
    const video = currentCanvases[0].getContent()[0].getBody()[0];
    return (
      <div style={{ display: 'flex', 'alignItems': 'center' }}>
        <video controls>
          <source src={video.id} type={video.format} />
        </video>
      </div>
    );
  }
}

AVViewer.propTypes = {
  currentCanvases: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  windowId: PropTypes.string.isRequired,
};
