import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';

/**
 * a panel showing the canvases for a given manifest
 */
class WindowSideBarCanvasPanel extends Component {
  /**
   * render
   */
  render() {
    const {
      canvasesIdAndLabel, setCanvas, windowId, classes, t,
    } = this.props:
    return (
      <>
        <Typography variant="h2" className={classes.windowSideBarH2}>{t('canvasIndex')}</Typography>
        <List>
          {
            canvasesIdAndLabel.map(canvas => (
              <ListItem key={canvas.id}>
                <Typography variant="body2">{canvas.label}</Typography>
              </ListItem>
            ))
          }
        </List>
      </>
    );
  }
}

WindowSideBarCanvasPanel.propTypes = {
  windowId: PropTypes.string.isRequired,
  canvasesIdAndLabel: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  setCanvas: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func.isRequired,
};

/**
 * @private
 * custom style definitions
 */
const styles = themes => ({
  windowSideBarH2: {
    theme.typography.h5,
  }
  clickable: {
    cursor: 'pointer',
  },
});

export default withStyles(styles)(WindowSideBarCanvasPanel);
