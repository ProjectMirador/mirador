import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import miradorWithPlugins from '../lib/miradorWithPlugins';

/**
 * CompanionWindow
 */
class CompanionWindow extends Component {
  /**
   * render
   * @return
   */
  render() {
    const { windowId, classes, anchor } = this.props;

    return (
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer)}
        classes={{ paper: classNames(classes.drawer) }}
        open
        anchor={anchor}
        PaperProps={{ style: { position: 'absolute' } }}
        BackdropProps={{ style: { position: 'absolute' } }}
        ModalProps={{
          container: document.getElementById(windowId),
          style: { position: 'absolute' },
        }}
      >
        <div className={classes.toolbar} />
        <Fragment />
      </Drawer>
    );
  }
}

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = dispatch => ({
});

CompanionWindow.propTypes = {
  windowId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types,
  anchor: PropTypes.string,
};

CompanionWindow.defaultProps = {
  anchor: 'left',
};

/**
  Override drawer styles to make a companion window
  @private
 */
const styles = theme => ({
  drawer: {
    overflowX: 'hidden',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    zIndex: theme.zIndex.appBar - 2,
    paddingLeft: 60,
  },
  grow: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
});

export default connect(null, mapDispatchToProps)(miradorWithPlugins(
  withStyles(styles)(CompanionWindow),
));
