import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

/**
 * a panel showing the canvases for a given manifest
 */
class WindowSideBarCanvasPanel extends Component {
  /**
   * render
   */
  render() {
    const { canvasesIdAndLabel } = this.props;
    return (
      <List>
        {
          canvasesIdAndLabel.map(canvas => (
            <ListItem key={canvas.id}>
              <Typography variant="body2">{canvas.label}</Typography>
            </ListItem>
          ))
        }
      </List>
    );
  }
}

WindowSideBarCanvasPanel.propTypes = {
  windowId: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  canvasesIdAndLabel: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default WindowSideBarCanvasPanel;
