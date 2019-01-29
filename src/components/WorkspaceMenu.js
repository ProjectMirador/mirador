import React, { Component } from 'react';
import { compose } from 'redux';
import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 */
export class WorkspaceMenu extends Component {
  /**
   * render
   * @return
   */
  render() {
    const { handleClose, anchorEl } = this.props;
    return (
      <Menu id="workspace-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} />
    );
  }
}

WorkspaceMenu.propTypes = {
  handleClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.string.isRequired,
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = {};

/**
 * @private
 */
const styles = theme => ({
});


const enhance = compose(
  connect(null, mapDispatchToProps),
  withStyles(styles),
  // further HOC go here
);

export default enhance(WorkspaceMenu);
