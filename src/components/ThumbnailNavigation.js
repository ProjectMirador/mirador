import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ThumbnailCanvasGrouping from '../containers/ThumbnailCanvasGrouping';
import ns from '../config/css-ns';

/**
 */
export class ThumbnailNavigation extends Component {
  /**
   */
  constructor(props) {
    super(props);

    this.scrollbarSize = 15;
    this.spacing = 16; // 2 * (2px margin + 2px border + 2px padding + 2px padding)
  }

  /** */
  containerHeight() {
    const { config, position } = this.props;
    switch (position) {
      case 'far-right':
        return '100%';
      default:
        return config.thumbnailNavigation.height;
    }
  }

  /** */
  containerWidth() {
    const { config, position } = this.props;
    switch (position) {
      case 'far-right':
        return config.thumbnailNavigation.width;
      default:
        return '100%';
    }
  }

  /**
   * Renders things
   */
  render() {
    const {
      position, canvasGroupings, config, window, t,
    } = this.props;
    if (position === 'off') {
      return <></>;
    }
    return (
      <nav
        className={ns('thumb-navigation')}
        aria-label={t('thumbnailNavigation')}
        style={{
          boxSizing: 'border-box',
          height: this.containerHeight(),
          overflowX: (position === 'far-bottom') ? 'scroll' : 'hidden',
          overflowY: (position === 'far-right') ? 'scroll' : 'hidden',
          padding: '2px',
          whiteSpace: (position === 'far-bottom') ? 'nowrap' : 'normal',
          width: this.containerWidth(),
        }}
      >
        {
          canvasGroupings.groupings().map(grouping => (
            <ThumbnailCanvasGrouping
              key={grouping.map(canvas => canvas.id).join('-')}
              grouping={grouping}
              height={config.thumbnailNavigation.height - this.spacing - this.scrollbarSize}
              windowId={window.id}
            />
          ))
        }
      </nav>
    );
  }
}

ThumbnailNavigation.propTypes = {
  canvasGroupings: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  config: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  position: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
