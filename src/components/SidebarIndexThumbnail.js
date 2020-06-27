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
      classes, otherCanvas, canvas, height, width,
    } = this.props;

    return (
      <>
        <div style={{ minWidth: 50 }}>
          <IIIFThumbnail
            resource={otherCanvas}
            className={classNames(classes.clickable)}
            maxHeight={height}
            maxWidth={width}
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
  height: PropTypes.number,
  otherCanvas: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  width: PropTypes.number,
};

SidebarIndexThumbnail.defaultProps = {
  height: undefined,
  width: undefined,
};
