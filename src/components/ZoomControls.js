import { Component } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircleOutlineSharp';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import RestoreZoomIcon from './icons/RestoreZoomIcon';
import MiradorMenuButton from '../containers/MiradorMenuButton';

const StyledZoomControlsWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});

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
      t, zoomToWorld,
    } = this.props;

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
      </StyledZoomControlsWrapper>
    );
  }
}

ZoomControls.propTypes = {
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
  t: key => key,
  updateViewport: () => {},
  viewer: {},
  windowId: '',
};
