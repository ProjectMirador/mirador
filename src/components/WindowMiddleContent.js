import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WindowSideBar from '../containers/WindowSideBar';
import CompanionWindow from '../containers/CompanionWindow';
import WindowViewer from '../containers/WindowViewer';
import ns from '../config/css-ns';

/**
 * WindowMiddleContent - component that renders the "middle" area of the
 * Mirador Window
 */
export class WindowMiddleContent extends Component {
  /**
   * renderViewer
   *
   * @return {(String|null)}
   */
  renderViewer() {
    const { manifest, window } = this.props;
    if (manifest && manifest.isFetching === false) {
      return (
        <WindowViewer
          window={window}
          manifest={manifest}
        />
      );
    }
    return null;
  }

  /**
   * Render the component
   */
  render() {
    const { companionWindowIds, window } = this.props;
    return (
      <div className={ns('window-middle-content')}>
        <WindowSideBar windowId={window.id} />
        {this.renderViewer()}
        { companionWindowIds.map(id => <CompanionWindow key={id} id={id} windowId={window.id} />) }
      </div>
    );
  }
}

WindowMiddleContent.propTypes = {
  companionWindowIds: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

WindowMiddleContent.defaultProps = {
  manifest: null,
};
