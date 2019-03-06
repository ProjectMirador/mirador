import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FullscreenIcon from '@material-ui/icons/FullscreenSharp';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExitSharp';
import PropTypes from 'prop-types';

/**
 */
export class WorkspaceFullScreenButton extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      classes, isFullscreenEnabled, setWorkspaceFullscreen, t,
    } = this.props;
    return (
      <IconButton
        className={classes.ctrlBtn}
        aria-label={isFullscreenEnabled ? t('exitFullScreen') : t('workspaceFullScreen')}
        onClick={() => setWorkspaceFullscreen(!isFullscreenEnabled)}
      >
        {
          isFullscreenEnabled
            ? <FullscreenExitIcon />
            : <FullscreenIcon />
        }
      </IconButton>
    );
  }
}

WorkspaceFullScreenButton.propTypes = {
  isFullscreenEnabled: PropTypes.bool,
  setWorkspaceFullscreen: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
};

WorkspaceFullScreenButton.defaultProps = {
  isFullscreenEnabled: false,
  t: key => key,
};
