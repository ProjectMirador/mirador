import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/CloseSharp';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ns from '../config/css-ns';
import WindowSideBarInfoPanel from '../containers/WindowSideBarInfoPanel';
import WindowSideBarCanvasPanel from '../containers/WindowSideBarCanvasPanel';
import WindowSideBarAnnotationsPanel from '../containers/WindowSideBarAnnotationsPanel';

/**
 * CompanionWindow
 */
export class CompanionWindow extends Component {
  /**
   * activePanelComponent
   * @return React Component
   */
  activePanelComponent() {
    const { content, windowId } = this.props;

    switch (content) {
      case 'info':
        return <WindowSideBarInfoPanel windowId={windowId} />;
      case 'canvas_navigation':
        return <WindowSideBarCanvasPanel windowId={windowId} />;
      case 'annotations':
        return <WindowSideBarAnnotationsPanel windowId={windowId} />;
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
      classes, id, onCloseClick, isDisplayed, position, t, windowId,
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
          onClick={() => { onCloseClick(windowId, id); }}
        >
          <CloseIcon />
        </IconButton>
      </Paper>
    );
  }
}

CompanionWindow.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types,
  content: PropTypes.string,
  id: PropTypes.string.isRequired,
  onCloseClick: PropTypes.func,
  position: PropTypes.string,
  isDisplayed: PropTypes.bool,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

CompanionWindow.defaultProps = {
  content: null,
  onCloseClick: () => {},
  isDisplayed: false,
  position: null,
  t: key => key,
};
