import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import ThumbnailNavigation from '../containers/ThumbnailNavigation';

/**
 * Render a companion window using the appropriate component for the content
 */
export class CompanionWindowFactory extends Component {
  /** */
  render() {
    const {
      content, panels, windowId, id,
    } = this.props;

    if (content === 'thumbnailNavigation') return <ThumbnailNavigation id={id} windowId={windowId} />;

    if (!panels[content]) return null;

    const Panel = panels[content].panel;

    return (<Suspense><Panel id={id} windowId={windowId} /></Suspense>);
  }
}

CompanionWindowFactory.propTypes = {
  content: PropTypes.string,
  id: PropTypes.string.isRequired,
  panels: PropTypes.objectOf(PropTypes.object),
  windowId: PropTypes.string.isRequired,
};

CompanionWindowFactory.defaultProps = {
  content: null,
  panels: {},
};
