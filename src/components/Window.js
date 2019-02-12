import React from 'react';
import PropTypes from 'prop-types';
import ns from '../config/css-ns';
import WindowTopBar from '../containers/WindowTopBar';
import WindowMiddleContent from '../containers/WindowMiddleContent';
import ThumbnailNavigation from '../containers/ThumbnailNavigation';

/**
 * Window
 * @param props
 * @returns {*}
 * @constructor
 */
function Window(props) {
  const { manifest, window } = props;
  return (
    <div className={ns('window')}>
      <WindowTopBar
        windowId={window.id}
        manifest={manifest}
      />
      <WindowMiddleContent
        window={window}
        manifest={manifest}
        sideBarOpen={window.sideBarOpen}
      />
      <div className={ns('companion-bottom')}>
        <ThumbnailNavigation
          window={window}
          manifest={manifest}
        />
      </div>
    </div>
  );
}

Window.propTypes = {
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Window.defaultProps = {
  manifest: null,
};

export default Window;
