import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

/**
 */
class WorkspaceFullScreenButton extends Component {
  /**
   * render
   * @return
   */
  render() {
    const { classes, fullscreenWorkspace } = this.props;
    return (
      <ListItem>
        <IconButton className={classes.ctrlBtn} aria-label="Full Screen" onClick={() => fullscreenWorkspace(true)}>
          <FullscreenIcon />
        </IconButton>
      </ListItem>
    );
  }
}

WorkspaceFullScreenButton.propTypes = {
  fullscreenWorkspace: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

/**
 * @private
 */
const styles = theme => ({
  ctrlBtn: {
    margin: theme.spacing.unit,
  },
});

export default withStyles(styles)(WorkspaceFullScreenButton);
