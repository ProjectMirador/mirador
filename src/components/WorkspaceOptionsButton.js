import { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import MoreHorizontalIcon from '@mui/icons-material/MoreHorizSharp';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import WorkspaceOptionsMenu from '../containers/WorkspaceOptionsMenu';

/**
 * WorkspaceOptionsButton ~
*/
export class WorkspaceOptionsButton extends Component {
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
      anchorEl: event.currentTarget,
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
   * Returns the rendered component
  */
  render() {
    const { t } = this.props;
    const { anchorEl, open } = this.state;

    return (
      <>
        <MiradorMenuButton
          aria-label={t('workspaceOptions')}
          onClick={this.handleMenuClick}
          sx={{
            ...(open && {
              backgroundColor: 'action.selected',
            }),
          }}
        >
          <MoreHorizontalIcon />
        </MiradorMenuButton>
        <WorkspaceOptionsMenu
          anchorEl={anchorEl}
          handleClose={this.handleMenuClose}
          open={open}
        />
      </>
    );
  }
}

WorkspaceOptionsButton.propTypes = {
  t: PropTypes.func.isRequired,
};
