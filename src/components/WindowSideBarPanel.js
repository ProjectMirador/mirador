import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNewSharp';
import WindowSideBarInfoPanel from '../containers/WindowSideBarInfoPanel';
import WindowSideBarCanvasPanel from '../containers/WindowSideBarCanvasPanel';
import WindowSideBarAnnotationsPanel from '../containers/WindowSideBarAnnotationsPanel';

/**
 * WindowSideBarPanel - the panel that pops out from the sidebar
 * when various icons are clicked such as Info, Search, etc.
 */
export class WindowSideBarPanel extends Component {
  /**
   * activePanelComponent
   * @return React Component
   */
  activePanelComponent() {
    const { windowId, sideBarPanel } = this.props;
    switch (sideBarPanel) {
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
      windowId, popOutCompanionWindow, sideBarPanel, t,
    } = this.props;
    return (
      <div>
        <IconButton
          style={{ float: 'right' }}
          aria-label={t('openInCompanionWindow')}
          onClick={() => { popOutCompanionWindow(windowId, sideBarPanel, 'right'); }}
        >
          <OpenInNewIcon />
        </IconButton>
        {this.activePanelComponent()}
      </div>
    );
  }
}

WindowSideBarPanel.propTypes = {
  popOutCompanionWindow: PropTypes.func,
  sideBarPanel: PropTypes.string,
  t: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};
WindowSideBarPanel.defaultProps = {
  popOutCompanionWindow: () => {},
  sideBarPanel: 'closed', // Closed will fall out to the default null case for the actiuve panel
};
