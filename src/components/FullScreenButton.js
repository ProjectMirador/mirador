import React, { Component } from 'react';
import FullscreenIcon from '@material-ui/icons/FullscreenSharp';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExitSharp';
import PropTypes from 'prop-types';
import MiradorMenuButton from '../containers/MiradorMenuButton';
/**
 */
export class FullScreenButton extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      className, isFullscreenEnabled, setWorkspaceFullscreen, t,
    } = this.props;
    return (
      <MiradorMenuButton
        className={className}
        aria-label={isFullscreenEnabled ? t('exitFullScreen') : t('workspaceFullScreen')}
        onClick={() => setWorkspaceFullscreen(!isFullscreenEnabled)}
      >
        {isFullscreenEnabled ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </MiradorMenuButton>
    );
  }
}

FullScreenButton.propTypes = {
  className: PropTypes.string,
  isFullscreenEnabled: PropTypes.bool,
  setWorkspaceFullscreen: PropTypes.func.isRequired,
  t: PropTypes.func,
};

FullScreenButton.defaultProps = {
  className: undefined,
  isFullscreenEnabled: false,
  t: key => key,
};
