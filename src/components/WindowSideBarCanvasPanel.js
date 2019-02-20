import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import ValidationCanvas from './ValidationCanvas';
import CanvasThumbnail from './CanvasThumbnail';
import { getIdAndLabelOfCanvases } from '../state/selectors';

/**
 * a panel showing the canvases for a given manifest
 */
class WindowSideBarCanvasPanel extends Component {
  /**
   * calculateScaledWidth - calculates the scaled width according to the given width and aspectRatio
   */
  static calculateScaledWidth(height, aspectRatio) {
    return Math.floor(height * aspectRatio);
  }

  /**
   * render
   */
  render() {
    const {
      canvases, classes, config, setCanvas, t, windowId,
    } = this.props;

    const canvasesIdAndLabel = getIdAndLabelOfCanvases(canvases);

    return (
      <>
        <Typography variant="h2" className={classes.windowSideBarH2}>{t('canvasIndex')}</Typography>
        <List>
          {
            canvasesIdAndLabel.map((canvas, canvasIndex) => {
              const validationCanvas = new ValidationCanvas(canvases[canvasIndex]);
              const isValid = validationCanvas.hasValidDimensions;
              const onClick = () => { setCanvas(windowId, canvasIndex); }; // eslint-disable-line require-jsdoc, max-len

              return (
                <ListItem
                  key={canvas.id}
                >
                  <CanvasThumbnail
                    className={classNames(classes.clickable)}
                    isValid={isValid}
                    imageUrl={validationCanvas.thumbnail(config.canvasNavigation.height)}
                    onClick={onClick}
                    style={{
                      cursor: 'pointer',
                      height: config.canvasNavigation.height,
                      width: isValid ? WindowSideBarCanvasPanel.calculateScaledWidth(config.canvasNavigation.height, validationCanvas.aspectRatio) : 'auto',
                    }}
                  />
                  <Typography
                    className={classNames(classes.clickable, classes.label)}
                    onClick={onClick}
                    variant="body2"
                  >
                    {canvas.label}
                  </Typography>
                </ListItem>
              );
            })
          }
        </List>
      </>
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
};

/**
 * @private
 * custom style definitions
 */
const styles = theme => ({
  windowSideBarH2: theme.typography.h5,
  clickable: {
    cursor: 'pointer',
  },
  label: {
    fontSize: '8pt',
    paddingLeft: 8,
  },
});

export default withStyles(styles)(WindowSideBarCanvasPanel);
