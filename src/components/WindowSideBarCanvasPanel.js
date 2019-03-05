import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { CanvasThumbnail } from './CanvasThumbnail';
import ManifestoCanvas from '../lib/ManifestoCanvas';
import CompanionWindow from '../containers/CompanionWindow';
import { getIdAndLabelOfCanvases } from '../state/selectors';

/**
 * a panel showing the canvases for a given manifest
 */
export class WindowSideBarCanvasPanel extends Component {
  /**
   * render
   */
  render() {
    const {
      canvases, classes, config, setCanvas, t, windowId, id,
    } = this.props;

    const canvasesIdAndLabel = getIdAndLabelOfCanvases(canvases);
    return (
      <CompanionWindow title={t('canvasIndex')} id={id} windowId={windowId}>
        <List>
          {
            canvasesIdAndLabel.map((canvas, canvasIndex) => {
              const { width, height } = config.canvasNavigation;
              const manifestoCanvas = new ManifestoCanvas(canvases[canvasIndex]);
              const isValid = manifestoCanvas.hasValidDimensions;
              const onClick = () => { setCanvas(windowId, canvasIndex); }; // eslint-disable-line require-jsdoc, max-len

              return (
                <ListItem
                  key={canvas.id}
                  alignItems="flex-start"
                  onClick={onClick}
                  button
                >
                  <div style={{ minWidth: 50 }}>
                    <CanvasThumbnail
                      className={classNames(classes.clickable)}
                      isValid={isValid}
                      imageUrl={manifestoCanvas.thumbnail(width, height)}
                      maxHeight={config.canvasNavigation.height}
                      maxWidth={config.canvasNavigation.width}
                      aspectRatio={manifestoCanvas.aspectRatio}
                    />
                  </div>
                  <Typography
                    className={classNames(classes.label)}
                    variant="body2"
                  >
                    {canvas.label}
                  </Typography>
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
