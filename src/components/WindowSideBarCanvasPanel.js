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
    const { canvases } = this.props;

    return (
      <List>
        {
          canvases.map(canvas => <ListItem key={canvas.__jsonld['@id']}><Typography variant="body2">{canvas.__jsonld.label}</Typography></ListItem>)// eslint-disable-line no-underscore-dangle
        }
      </List>
    );
  }
}

WindowSideBarCanvasPanel.propTypes = {
  windowId: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  canvases: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default WindowSideBarCanvasPanel;
