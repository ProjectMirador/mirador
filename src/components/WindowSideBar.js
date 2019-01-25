import React, { Component } from 'react';
import { compose } from 'redux';
import classNames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ConnectedWindowSideBarButtons from './WindowSideBarButtons';
import miradorWithPlugins from '../lib/miradorWithPlugins';

/**
 * WindowSideBar
 */
export class WindowSideBar extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      windowId, classes, anchor,
    } = this.props;
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
        <List>
          <ConnectedWindowSideBarButtons windowId={windowId} />
        </List>
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

WindowSideBar.propTypes = {
  windowId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types,
  anchor: PropTypes.string,
};

WindowSideBar.defaultProps = {
  anchor: 'left',
};

/**
 Material UI style overrides
 @private
 */
const styles = theme => ({
  drawer: {
    overflowX: 'hidden',
    width: 55,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    zIndex: theme.zIndex.appBar - 1,
  },
  grow: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
});

const enhance = compose(
  connect(null, mapDispatchToProps),
  miradorWithPlugins,
  withStyles(styles),
  // further HOC go here
);

export default enhance(WindowSideBar);
