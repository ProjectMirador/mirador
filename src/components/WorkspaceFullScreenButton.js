import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import ListItem from '@material-ui/core/ListItem';
import PropTypes from 'prop-types';

/**
 */
export class WorkspaceFullScreenButton extends Component {
  /**
   * render
   * @return
   */
  render() {
    const { classes, setWorkspaceFullscreen, t } = this.props;
    return (
      <ListItem>
        <IconButton className={classes.ctrlBtn} aria-label={t('fullScreen')} onClick={() => setWorkspaceFullscreen(true)}>
          <FullscreenIcon />
        </IconButton>
      </ListItem>
    );
  }
}

WorkspaceFullScreenButton.propTypes = {
  setWorkspaceFullscreen: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
};

WorkspaceFullScreenButton.defaultProps = {
  t: key => key,
};
