import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WindowSideBarInfoPanel from '../containers/WindowSideBarInfoPanel';

/**
 * WindowSideBarPanel - the panel that pops out from the sidebar
 * when various icons are clicked such as Info, Search, etc.
 */
class WindowSideBarPanel extends Component {
  /**
   * activePanelComponent
   * @return React Component
   */
  activePanelComponent() {
    const { windowId, sideBarPanel } = this.props;
    switch (sideBarPanel) {
      case 'info':
        return <WindowSideBarInfoPanel windowId={windowId} />;
      default:
        return null;
    }
  }

  /**
   * render
   * @return
   */
  render() {
    return (
      <div>
        {this.activePanelComponent()}
      </div>
    );
  }
}

WindowSideBarPanel.propTypes = {
  sideBarPanel: PropTypes.string,
  windowId: PropTypes.string.isRequired,
};
WindowSideBarPanel.defaultProps = {
  sideBarPanel: 'closed', // Closed will fall out to the default null case for the actiuve panel
};

export default WindowSideBarPanel;
