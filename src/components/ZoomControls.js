import { Component } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircleOutlineSharp';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import RestoreZoomIcon from './icons/RestoreZoomIcon';
import MiradorMenuButton from '../containers/MiradorMenuButton';

const StyledZoomControlsWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});

const dividerStyle = {
  borderRight: '1px solid #808080',
  display: 'inline-block',
  height: '24px',
  margin: '12px 6px',
};

/**
 */
export class ZoomControls extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);

    this.handleZoomInClick = this.handleZoomInClick.bind(this);
    this.handleZoomOutClick = this.handleZoomOutClick.bind(this);
  }

  /**
   * @private
   */
  handleZoomInClick() {
    const { windowId, updateViewport, viewer } = this.props;

    updateViewport(windowId, {
      zoom: viewer.zoom * 2,
    });
  }

  /**
   * @private
   */
  handleZoomOutClick() {
    const { windowId, updateViewport, viewer } = this.props;

    updateViewport(windowId, {
      zoom: viewer.zoom / 2,
    });
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      classes, displayDivider, showZoomControls, t, zoomToWorld,
    } = this.props;

    if (!showZoomControls) {
      return (
        <>
        </>
      );
    }
    return (
      <StyledZoomControlsWrapper>
        <MiradorMenuButton aria-label={t('zoomIn')} onClick={this.handleZoomInClick}>
          <AddCircleIcon />
        </MiradorMenuButton>
        <MiradorMenuButton aria-label={t('zoomOut')} onClick={this.handleZoomOutClick}>
          <RemoveCircleIcon />
        </MiradorMenuButton>
        <MiradorMenuButton aria-label={t('zoomReset')} onClick={() => zoomToWorld(false)}>
          <RestoreZoomIcon />
        </MiradorMenuButton>
        {displayDivider && <Box component="span" sx={dividerStyle} className={classes?.divider} />}
      </StyledZoomControlsWrapper>
    );
  }
}

ZoomControls.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  displayDivider: PropTypes.bool,
  showZoomControls: PropTypes.bool,
  t: PropTypes.func,
  updateViewport: PropTypes.func,
  viewer: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    zoom: PropTypes.number,
  }),
  windowId: PropTypes.string,
  zoomToWorld: PropTypes.func.isRequired,
};

ZoomControls.defaultProps = {
  classes: {},
  displayDivider: true,
  showZoomControls: false,
  t: key => key,
  updateViewport: () => {},
  viewer: {},
  windowId: '',
};
