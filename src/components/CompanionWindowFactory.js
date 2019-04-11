import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ThumbnailNavigation from '../containers/ThumbnailNavigation';
import WindowSideBarAnnotationsPanel from '../containers/WindowSideBarAnnotationsPanel';
import WindowSideBarInfoPanel from '../containers/WindowSideBarInfoPanel';
import WindowSideBarCanvasPanel from '../containers/WindowSideBarCanvasPanel';
import WindowSideBarCollectionPanel from '../containers/WindowSideBarCollectionPanel';

/**
 * Render a companion window using the appropriate component for the content
 */
export class CompanionWindowFactory extends Component {
  /** */
  render() {
    const { content, windowId, id } = this.props;

    switch (content) {
      case 'info':
        return (<WindowSideBarInfoPanel id={id} windowId={windowId} />);
      case 'canvas':
        return (<WindowSideBarCanvasPanel id={id} windowId={windowId} />);
      case 'collection':
        return (<WindowSideBarCollectionPanel id={id} windowId={windowId} />);
      case 'annotations':
        return <WindowSideBarAnnotationsPanel id={id} windowId={windowId} />;
      case 'thumbnailNavigation':
        return <ThumbnailNavigation id={id} windowId={windowId} />;
      default:
        return (<></>);
    }
  }
}

CompanionWindowFactory.propTypes = {
  content: PropTypes.string,
  id: PropTypes.string.isRequired,
  windowId: PropTypes.string.isRequired,
};

CompanionWindowFactory.defaultProps = {
  content: null,
};
