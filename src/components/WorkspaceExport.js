import React, { Component } from 'react';
import { compose } from 'redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 */
export class WorkspaceExport extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      handleClose, open, children,
    } = this.props;
    return (
      <Dialog id="workspace-settings" open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Download/Export</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
      </Dialog>
    );
  }
}

WorkspaceExport.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node,
};

WorkspaceExport.defaultProps = {
  open: false,
  children: null,
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = {
};

/**
 * mapStateToProps - to hook up connect
 * @memberof WorkspaceControlPanel
 * @private
 */
const mapStateToProps = state => (
  {
  }
);

/**
 * @private
 */
const styles = theme => ({
});


const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  // further HOC go here
);

export default enhance(WorkspaceExport);
