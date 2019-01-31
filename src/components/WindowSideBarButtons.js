import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

/**
 *
 */
class WindowSideBarButtons extends Component {
  /**
   * render
   *
   * @return {type}  description
   */
  render() {
    const { toggleWindowSideBarPanel } = this.props;
    return (
      <>
        <IconButton
          aria-label="Open information companion window"
          color="inherit"
          onClick={() => (toggleWindowSideBarPanel('info'))}
        >
          <InfoIcon />
        </IconButton>
      </>
    );
  }
}

WindowSideBarButtons.propTypes = {
  toggleWindowSideBarPanel: PropTypes.func,
};

WindowSideBarButtons.defaultProps = {
  toggleWindowSideBarPanel: () => {},
};

export default WindowSideBarButtons;
