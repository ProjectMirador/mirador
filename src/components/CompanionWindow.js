import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ns from '../config/css-ns';
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
    const {
      classes, closeCompanionWindow, isDisplayed, position, t, windowId,
    } = this.props;
    return (
      <Paper
        className={[classes.root, ns(`companion-window-${position}`)].join(' ')}
        style={{ display: isDisplayed ? null : 'none' }}
        square
      >
        {this.activePanelComponent()}
        <IconButton
          aria-label={t('closeCompanionWindow')}
          className={classes.closeButton}
          onClick={() => { closeCompanionWindow(windowId, null, position); }}
        >
          <CloseIcon />
        </IconButton>
      </Paper>
    );
  }
}

CompanionWindow.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types,
  closeCompanionWindow: PropTypes.func,
  isDisplayed: PropTypes.bool,
  panelContent: PropTypes.string,
  position: PropTypes.string.isRequired,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

CompanionWindow.defaultProps = {
  closeCompanionWindow: () => {},
  panelContent: null,
  isDisplayed: false,
  t: key => key,
};

/**
 * Styles for Material-UI HOC
 */
const styles = theme => ({
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  root: {
    ...theme.mixins.gutters(),
    width: '200px',
    overflowY: 'scroll',
  },
});

export default withStyles(styles)(CompanionWindow);
