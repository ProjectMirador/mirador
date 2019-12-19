import React, { Component } from 'react';
import NavigationIcon from '@material-ui/icons/PlayCircleOutlineSharp';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
      classes, viewingDirection,
    } = this.props;

    let htmlDir = 'ltr';
    let nextIconStyle = { transform: 'rotate(180deg)' };
    let previousIconStyle = {};
    if (viewingDirection === 'right-to-left') {
      htmlDir = 'rtl';
      nextIconStyle = {};
      previousIconStyle = { transform: 'rotate(180deg)' };
    }

    return (
      <div
        className={classNames(ns('osd-navigation'), classes.osdNavigation)}
        dir={htmlDir}
      >
        <MiradorMenuButton
          aria-label={t('previousCanvas')}
          className={ns('previous-canvas-button')}
          disabled={!hasPreviousCanvas}
          onClick={() => { hasPreviousCanvas && setPreviousCanvas(); }}
        >
          <NavigationIcon style={nextIconStyle} />
        </MiradorMenuButton>
        <MiradorMenuButton
          aria-label={t('nextCanvas')}
          className={ns('next-canvas-button')}
          disabled={!hasNextCanvas}
          onClick={() => { hasNextCanvas && setNextCanvas(); }}
        >
          <NavigationIcon style={previousIconStyle} />
        </MiradorMenuButton>
      </div>
    );
  }
}

ViewerNavigation.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  hasNextCanvas: PropTypes.bool,
  hasPreviousCanvas: PropTypes.bool,
  setNextCanvas: PropTypes.func,
  setPreviousCanvas: PropTypes.func,
  t: PropTypes.func.isRequired,
  viewingDirection: PropTypes.string,
};

ViewerNavigation.defaultProps = {
  hasNextCanvas: false,
  hasPreviousCanvas: false,
  setNextCanvas: () => {},
  setPreviousCanvas: () => {},
  viewingDirection: '',
};
