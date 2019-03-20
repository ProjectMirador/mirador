import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { CanvasThumbnail } from './CanvasThumbnail';
import ManifestoCanvas from '../lib/ManifestoCanvas';
import CompanionWindow from '../containers/CompanionWindow';

/**
 * a panel showing the canvases for a given manifest
 */
export class WindowSideBarCanvasPanel extends Component {
  /** */
  constructor(props) {
    super(props);

    this.state = { variant: 'thumbnail' };
    this.handleVariantChange = this.handleVariantChange.bind(this);
  }

  /** @private */
  getIdAndLabelOfCanvases() {
    const { canvases } = this.props;

    return canvases.map((canvas, index) => ({
      id: canvas.id,
      label: new ManifestoCanvas(canvas).getLabel(),
    }));
  }

  /** */
  handleVariantChange(event) {
    this.setState({ variant: event.target.value });
  }

  /** */
  renderCompact(canvas, otherCanvas) {
    const {
      classes,
    } = this.props;

    return (
      <>
        <Typography
          className={classNames(classes.label)}
          variant="body1"
        >
          {canvas.label}
        </Typography>
      </>
    );
  }

  /** */
  renderThumbnail(canvas, otherCanvas) {
    const {
      classes, config,
    } = this.props;
    const { width, height } = config.canvasNavigation;
    const manifestoCanvas = new ManifestoCanvas(otherCanvas);

    return (
      <>
        <div style={{ minWidth: 50 }}>
          <CanvasThumbnail
            className={classNames(classes.clickable)}
            isValid={manifestoCanvas.hasValidDimensions}
            imageUrl={manifestoCanvas.thumbnail(width, height)}
            maxHeight={config.canvasNavigation.height}
            maxWidth={config.canvasNavigation.width}
            aspectRatio={manifestoCanvas.aspectRatio}
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

  /**
   * render
   */
  render() {
    const {
      canvases, setCanvas, classes, t, windowId, id,
    } = this.props;

    const { variant } = this.state;


    const canvasesIdAndLabel = this.getIdAndLabelOfCanvases(canvases);
    return (
      <CompanionWindow
        title={t('canvasIndex')}
        id={id}
        windowId={windowId}
        titleControls={(
          <FormControl>
            <Select
              MenuProps={{
                anchorOrigin: {
                  horizontal: 'left',
                  vertical: 'bottom',
                },
                getContentAnchorEl: null,
              }}
              displayEmpty
              value={variant}
              onChange={this.handleVariantChange}
              name="variant"
              classes={{ select: classes.select }}
              className={classes.selectEmpty}
            >
              <MenuItem value="compact"><Typography variant="body2">{ t('compactList') }</Typography></MenuItem>
              <MenuItem value="thumbnail"><Typography variant="body2">{ t('thumbnailList') }</Typography></MenuItem>
            </Select>
          </FormControl>
          )}
      >
        <List>
          {
            canvasesIdAndLabel.map((canvas, canvasIndex) => {
              const onClick = () => { setCanvas(windowId, canvasIndex); }; // eslint-disable-line require-jsdoc, max-len

              return (
                <ListItem
                  key={canvas.id}
                  className={classes.listItem}
                  alignItems="flex-start"
                  onClick={onClick}
                  button
                  component="li"
                >
                  {variant === 'compact' && this.renderCompact(canvas, canvases[canvasIndex])}
                  {variant === 'thumbnail' && this.renderThumbnail(canvas, canvases[canvasIndex])}
                </ListItem>
              );
            })
          }
        </List>
      </CompanionWindow>
    );
  }
}

WindowSideBarCanvasPanel.propTypes = {
  canvases: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  config: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  setCanvas: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
