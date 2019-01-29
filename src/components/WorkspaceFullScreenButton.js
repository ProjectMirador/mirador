import React, { Component } from 'react';
import { compose } from 'redux';
import IconButton from '@material-ui/core/IconButton';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from '../store';

/**
 */
export class WorkspaceFullScreenButton extends Component {
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
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = { fullscreenWorkspace: actions.fullscreenWorkspace };

/**
 * @private
 */
const styles = theme => ({
  ctrlBtn: {
    margin: theme.spacing.unit,
  },
});


const enhance = compose(
  connect(null, mapDispatchToProps),
  withStyles(styles),
  // further HOC go here
);

export default enhance(WorkspaceFullScreenButton);
