import { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import IIIFThumbnail from '../containers/IIIFThumbnail';

/** */
export class SidebarIndexThumbnail extends Component {
  /** */
  render() {
    const {
      canvas, height, label, width,
    } = this.props;

    return (
      <>
        <div style={{ minWidth: 50 }}>
          <IIIFThumbnail
            label={label}
            resource={canvas}
            maxHeight={height}
            maxWidth={width}
          />
        </div>
        <Typography
          sx={{ paddingLeft: 1 }}
          variant="body1"
        >
          {label}
        </Typography>
      </>
    );
  }
}

SidebarIndexThumbnail.propTypes = {
  canvas: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  height: PropTypes.number,
  label: PropTypes.string.isRequired,
  width: PropTypes.number,
};

SidebarIndexThumbnail.defaultProps = {
  height: undefined,
  width: undefined,
};
