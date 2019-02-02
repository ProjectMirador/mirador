import React, { Component } from 'react';
import { compose } from 'redux';
import ListItem from '@material-ui/core/ListItem';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import WindowThumbnailSettings from '../containers/WindowThumbnailSettings';

/**
 */
class WindowTopMenu extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  /**
   * render
   * @return
   */
  render() {
    const { handleClose, anchorEl, windowId } = this.props;
    // const {} = this.state;

    return (
      <>
        <Menu id={`window-menu_${windowId}`} anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <ListItem>
            <WindowThumbnailSettings windowId={windowId} />
          </ListItem>
          <Divider />
        </Menu>
      </>
    );
  }
}

WindowTopMenu.propTypes = {
  windowId: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.object,
};

WindowTopMenu.defaultProps = {
  anchorEl: null,
};

/**
 * @private
 */
const styles = theme => ({
});

const enhance = compose(
  withStyles(styles),
  // further HOC go here
);

export default enhance(WindowTopMenu);
