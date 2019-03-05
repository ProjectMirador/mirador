import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AddCircleIcon from '@material-ui/icons/AddCircleOutlineSharp';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircleOutlineSharp';
import PropTypes from 'prop-types';
import RestoreZoomIcon from './icons/RestoreZoomIcon';
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
    this.handleZoomResetClick = this.handleZoomResetClick.bind(this);
  }

  /**
   * @private
   */
  handleZoomInClick() {
    const { windowId, updateViewport, viewer } = this.props;

    updateViewport(windowId, {
      x: viewer.x,
      y: viewer.y,
      zoom: viewer.zoom * 2,
    });
  }

  /**
   * @private
   */
  handleZoomOutClick() {
    const { windowId, updateViewport, viewer } = this.props;

    updateViewport(windowId, {
      x: viewer.x,
      y: viewer.y,
      zoom: viewer.zoom / 2,
    });
  }

  /**
   * @private
   */
  handleZoomResetClick() {
    const { windowId, updateViewport, viewer } = this.props;

    updateViewport(windowId, {
      x: viewer.x,
      y: viewer.y,
      zoom: 1,
    });
  }

  /**
   * render
   * @return
   */
  render() {
    const { showZoomControls, classes, t } = this.props;

    if (!showZoomControls) {
      return (
        <>
        </>
      );
    }
    return (
      <List className={classes.zoom_controls}>
        <ListItem>
          <IconButton aria-label={t('zoomIn')} onClick={this.handleZoomInClick}>
            <AddCircleIcon />
          </IconButton>
        </ListItem>
        <ListItem>
          <IconButton aria-label={t('zoomOut')} onClick={this.handleZoomOutClick}>
            <RemoveCircleIcon />
          </IconButton>
        </ListItem>
        <ListItem>
          <IconButton aria-label={t('zoomReset')} onClick={this.handleZoomResetClick}>
            <RestoreZoomIcon />
          </IconButton>
        </ListItem>
      </List>
    );
  }
}

ZoomControls.propTypes = {
  windowId: PropTypes.string,
  showZoomControls: PropTypes.bool,
  viewer: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    zoom: PropTypes.number,
  }),
  updateViewport: PropTypes.func,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func.isRequired,
};

ZoomControls.defaultProps = {
  windowId: '',
  showZoomControls: false,
  viewer: {},
  updateViewport: () => {},
};
