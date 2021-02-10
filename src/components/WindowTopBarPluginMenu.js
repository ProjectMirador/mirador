import { Component } from 'react';
import PropTypes from 'prop-types';
import MoreVertIcon from '@material-ui/icons/MoreVertSharp';
import Menu from '@material-ui/core/Menu';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import { PluginHook } from './PluginHook';

/**
 *
 */
export class WindowTopBarPluginMenu extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  /**
   * Set the anchorEl state to the click target
   */
  handleMenuClick(event) {
    this.setState({
      anchorEl: event.currentTarget,
      open: true,
    });
  }

  /**
   * Set the anchorEl state to null (closing the menu)
   */
  handleMenuClose() {
    this.setState({
      anchorEl: null,
      open: false,
    });
  }

  /**
   * render component
   */
  render() {
    const {
      classes, container, PluginComponents, t, windowId, menuIcon,
    } = this.props;
    const { anchorEl, open } = this.state;
    const windowPluginMenuId = `window-plugin-menu_${windowId}`;
    if (!PluginComponents || PluginComponents.length === 0) return null;

    return (
      <>
        <MiradorMenuButton
          aria-expanded={!!anchorEl}
          aria-haspopup="true"
          aria-label={t('windowPluginMenu')}
          aria-owns={open ? windowPluginMenuId : undefined}
          className={open ? classes.ctrlBtnSelected : null}
          onClick={this.handleMenuClick}
        >
          {menuIcon}
        </MiradorMenuButton>

        <Menu
          id={windowPluginMenuId}
          container={container?.current}
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
          open={open}
          onClose={() => this.handleMenuClose()}
        >
          <PluginHook handleClose={() => this.handleMenuClose()} {...this.props} />
        </Menu>
      </>
    );
  }
}

WindowTopBarPluginMenu.propTypes = {
  anchorEl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.shape({
    ctrlBtnSelected: PropTypes.string,
  }),
  container: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  menuIcon: PropTypes.element,
  open: PropTypes.bool,
  PluginComponents: PropTypes.arrayOf(
    PropTypes.node,
  ),
  t: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

WindowTopBarPluginMenu.defaultProps = {
  anchorEl: null,
  classes: {},
  container: null,
  menuIcon: <MoreVertIcon />,
  open: false,
  PluginComponents: [],
};
