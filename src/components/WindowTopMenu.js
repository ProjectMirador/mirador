import { Component } from 'react';
import Menu from '@material-ui/core//Menu';
import ListSubheader from '@material-ui/core/ListSubheader';
import PropTypes from 'prop-types';
import WindowThumbnailSettings from '../containers/WindowThumbnailSettings';
import WindowViewSettings from '../containers/WindowViewSettings';
import { PluginHook } from './PluginHook';

/** Renders plugins */
function PluginHookWithHeader(props) {
  const { PluginComponents, t } = props; // eslint-disable-line react/prop-types
  return PluginComponents ? (
    <>
      <ListSubheader role="presentation" disableSticky tabIndex="-1">{t('windowPluginButtons')}</ListSubheader>
      <PluginHook {...props} />
    </>
  ) : null;
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
      container, handleClose, showThumbnailNavigationSettings,
      toggleDraggingEnabled, anchorEl, open,
    } = this.props;

    return (
      <Menu
        container={container?.current}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        onClose={handleClose}
        TransitionProps={{
          onEntering: toggleDraggingEnabled,
          onExit: toggleDraggingEnabled,
        }}
        orientation="horizontal"
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        open={open}
      >
        <WindowViewSettings handleClose={handleClose} />
        {showThumbnailNavigationSettings
          && <WindowThumbnailSettings handleClose={handleClose} />}
        <PluginHookWithHeader {...this.props} />
      </Menu>
    );
  }
}

WindowTopMenu.propTypes = {
  anchorEl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  container: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  showThumbnailNavigationSettings: PropTypes.bool,
  toggleDraggingEnabled: PropTypes.func.isRequired,
};

WindowTopMenu.defaultProps = {
  anchorEl: null,
  container: null,
  open: false,
  showThumbnailNavigationSettings: true,
};
