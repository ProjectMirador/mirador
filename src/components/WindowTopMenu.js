import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import ListSubheader from '@material-ui/core/ListSubheader';
import PropTypes from 'prop-types';
import WindowThumbnailSettings from '../containers/WindowThumbnailSettings';
import WindowViewSettings from '../containers/WindowViewSettings';
import ns from '../config/css-ns';

/** Renders plugins */
function PluginHook(props) {
  const { PluginComponents, t } = props; // eslint-disable-line react/prop-types
  return PluginComponents && (
    <>
      <ListSubheader role="presentation" tabIndex="-1">{t('windowPluginButtons')}</ListSubheader>
      {
        PluginComponents.map((PluginComponent, index) => (
          <PluginComponent {...props} key={index} /> // eslint-disable-line react/no-array-index-key
        ))
      }
    </>
  );
}

/**
 */
export class WindowTopMenu extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      containerId, handleClose, anchorEl, windowId,
    } = this.props;
    // const {} = this.state;

    return (
      <>
        <Menu
          id={`window-menu_${windowId}`}
          container={document.querySelector(`#${containerId} .${ns('viewer')}`)}
          anchorEl={anchorEl}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom',
          }}
          transformOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
          getContentAnchorEl={null}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          disableAutoFocusItem
        >
          <WindowViewSettings windowId={windowId} handleClose={handleClose} />
          <WindowThumbnailSettings windowId={windowId} handleClose={handleClose} />
          <PluginHook {...this.props} />
        </Menu>
      </>
    );
  }
}

WindowTopMenu.propTypes = {
  anchorEl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  containerId: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

WindowTopMenu.defaultProps = {
  anchorEl: null,
};
