import { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import WindowTopMenu from '../containers/WindowTopMenu';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import WindowOptionsIcon from './icons/WindowOptionsIcon';

/**
 */
export class WindowTopMenuButton extends Component {
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
   * @private
   */
  handleMenuClick(event) {
    this.setState({
      anchorEl: event.target,
      open: true,
    });
  }

  /**
   * @private
   */
  handleMenuClose() {
    this.setState({
      anchorEl: null,
      open: false,
    });
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      classes, className, t, windowId,
    } = this.props;
    const { open, anchorEl } = this.state;
    const menuId = `window-menu_${windowId}`;
    return (
      <>
        <MiradorMenuButton
          aria-haspopup="true"
          aria-label={t('windowMenu')}
          aria-owns={open ? menuId : undefined}
          className={classNames(className, open ? classes.ctrlBtnSelected : null)}
          onClick={this.handleMenuClick}
        >
          <WindowOptionsIcon />
        </MiradorMenuButton>
        <WindowTopMenu
          anchorEl={anchorEl}
          handleClose={this.handleMenuClose}
          id={menuId}
          open={open}
        />
      </>
    );
  }
}

WindowTopMenuButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

WindowTopMenuButton.defaultProps = {
  className: '',
  t: key => key,
};
