import React, { Component } from 'react';
import NavigationIcon from '@material-ui/icons/PlayCircleOutlineSharp';
import PropTypes from 'prop-types';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import ns from '../config/css-ns';

/**
 */
export class ViewerNavigation extends Component {
  /**
   * Renders things
   */
  render() {
    const {
      hasNextCanvas, hasPreviousCanvas, setNextCanvas, setPreviousCanvas, t,
    } = this.props;

    return (
      <div className={ns('osd-navigation')}>
        <MiradorMenuButton
          aria-label={t('previousCanvas')}
          className={ns('previous-canvas-button')}
          disabled={!hasPreviousCanvas}
          onClick={() => { hasPreviousCanvas && setPreviousCanvas(); }}
        >
          <NavigationIcon style={{ transform: 'rotate(180deg)' }} />
        </MiradorMenuButton>
        <MiradorMenuButton
          aria-label={t('nextCanvas')}
          className={ns('next-canvas-button')}
          disabled={!hasNextCanvas}
          onClick={() => { hasNextCanvas && setNextCanvas(); }}
        >
          <NavigationIcon />
        </MiradorMenuButton>
      </div>
    );
  }
}

ViewerNavigation.propTypes = {
  hasNextCanvas: PropTypes.bool,
  hasPreviousCanvas: PropTypes.bool,
  setNextCanvas: PropTypes.func,
  setPreviousCanvas: PropTypes.func,
  t: PropTypes.func.isRequired,
};

ViewerNavigation.defaultProps = {
  hasNextCanvas: false,
  hasPreviousCanvas: false,
  setNextCanvas: () => {},
  setPreviousCanvas: () => {},
};
