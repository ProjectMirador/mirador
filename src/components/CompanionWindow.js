import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import WindowSideBarInfoPanel from '../containers/WindowSideBarInfoPanel';
import WindowSideBarCanvasPanel from '../containers/WindowSideBarCanvasPanel';

/**
 * CompanionWindow
 */
class CompanionWindow extends Component {
  /**
   * activePanelComponent
   * @return React Component
   */
  activePanelComponent() {
    const { windowId, panelContent } = this.props;
    switch (panelContent) {
      case 'info':
        return <WindowSideBarInfoPanel windowId={windowId} />;
      case 'canvas_navigation':
        return <WindowSideBarCanvasPanel windowId={windowId} />;
      default:
        return null;
    }
  }

  /**
   * render
   * @return
   */
  render() {
    const { classes, isDisplayed } = this.props;
    return (
      <Paper
        className={classes.root}
        style={{ display: isDisplayed ? 'inherit' : 'none' }}
      >
        {this.activePanelComponent()}
      </Paper>
    );
  }
}

CompanionWindow.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types,
  isDisplayed: PropTypes.bool,
  panelContent: PropTypes.string,
  windowId: PropTypes.string.isRequired,
};

CompanionWindow.defaultProps = {
  panelContent: null,
  isDisplayed: false,
};

/**
 * Styles for Material-UI HOC
 */
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    maxWidth: '200px',
    overflowY: 'scroll',
  },
});

export default withStyles(styles)(CompanionWindow);
