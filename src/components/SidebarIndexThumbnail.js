import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import IIIFThumbnail from '../containers/IIIFThumbnail';

/** */
export class SidebarIndexThumbnail extends Component {
  /** */
  render() {
    const {
      classes, config, otherCanvas, canvas,
    } = this.props;

    return (
      <>
        <div style={{ minWidth: 50 }}>
          <IIIFThumbnail
            resource={otherCanvas}
            className={classNames(classes.clickable)}
            maxHeight={config.canvasNavigation.height}
            maxWidth={config.canvasNavigation.width}
          />
        </div>
        <Typography
          className={classNames(classes.label)}
          variant="body1"
        >
          {canvas.label}
        </Typography>
      </>
    );
  }
}

SidebarIndexThumbnail.propTypes = {
  canvas: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  config: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  otherCanvas: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
