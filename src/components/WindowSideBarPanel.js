import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WindowSideBarInfoPanel from './WindowSideBarInfoPanel';

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
    const { manifest, sideBarPanel } = this.props;
    switch (sideBarPanel) {
      case 'info':
        return <WindowSideBarInfoPanel manifest={manifest} />;
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
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  sideBarPanel: PropTypes.string,
};
WindowSideBarPanel.defaultProps = {
  manifest: {},
  sideBarPanel: 'closed', // Closed will fall out to the default null case for the actiuve panel
};

export default WindowSideBarPanel;
