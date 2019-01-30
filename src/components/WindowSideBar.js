import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ConnectedWindowSideBarButtons from './WindowSideBarButtons';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import ns from '../config/css-ns';

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
      windowId, classes,
    } = this.props;
    return (
      <div className={ns('window-sidebar')}>
        <div className={classes.toolbar} />
        <List>
          <ConnectedWindowSideBarButtons windowId={windowId} />
        </List>
      </div>
    );
  }
}


WindowSideBar.propTypes = {
  windowId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types,
};

/**
 Material UI style overrides
 @private
 */
const styles = theme => ({
  toolbar: theme.mixins.toolbar,
});

const enhance = compose(
  connect(null, null),
  miradorWithPlugins,
  withStyles(styles),
  // further HOC go here
);

export default enhance(WindowSideBar);
