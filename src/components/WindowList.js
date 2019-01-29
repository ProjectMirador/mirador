import React, { Component } from 'react';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from '../store';

/**
 */
export class WindowList extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      handleClose, anchorEl, windows, focusWindow,
    } = this.props;
    return (
      <Menu id="window-list-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <ListSubheader>
          <Button color="inherit" aria-label="Close Menu" onClick={handleClose} align="right" style={{ float: 'right' }}>&times;</Button>
          Open windows
        </ListSubheader>
        {
          Object.values(windows).map(window => (
            <MenuItem
              key={window.id}
              onClick={(e) => { focusWindow(window.id); handleClose(e); }}
            >
              {
                window.id
              }
            </MenuItem>
          ))
        }
      </Menu>
    );
  }
}

WindowList.propTypes = {
  focusWindow: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.string.isRequired,
  windows: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = {
  focusWindow: actions.focusWindow,
};

/**
 * mapStateToProps - to hook up connect
 * @memberof WorkspaceControlPanel
 * @private
 */
const mapStateToProps = state => (
  {
    windows: state.windows,
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

export default enhance(WindowList);
