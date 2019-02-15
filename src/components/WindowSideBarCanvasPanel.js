import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { canvasesIdAndLabel, classes, t } = this.props;
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
  windowId: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  canvasesIdAndLabel: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func.isRequired,
};

/**
 * @private
 */
const styles = theme => ({
  windowSideBarH2: theme.typography.h5,
});

export default withStyles(styles)(WindowSideBarCanvasPanel);
