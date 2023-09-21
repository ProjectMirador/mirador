import { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import WindowTopMenu from '../containers/WindowTopMenu';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import WindowOptionsIcon from './icons/WindowOptionsIcon';

const StyledMiradorMenuButton = styled(MiradorMenuButton)({
});
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
      t, windowId,
    } = this.props;
    const { open, anchorEl } = this.state;
    const menuId = `window-menu_${windowId}`;
    return (
      <>
        <StyledMiradorMenuButton
          aria-haspopup="true"
          aria-label={t('windowMenu')}
          aria-owns={open ? menuId : undefined}
          sx={{
            margin: 1,
            ...(open && {
              backgroundColor: 'action.selected',
            }),
          }}
          onClick={this.handleMenuClick}
        >
          <WindowOptionsIcon />
        </StyledMiradorMenuButton>
        <WindowTopMenu
          windowId={windowId}
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
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

WindowTopMenuButton.defaultProps = {
  t: key => key,
};
