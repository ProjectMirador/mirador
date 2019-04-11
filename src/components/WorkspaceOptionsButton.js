import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MoreHorizontalIcon from '@material-ui/icons/MoreHorizSharp';
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
    this.state = { anchorEl: null };
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  /**
   * @private
   */
  handleMenuClick(event) {
    this.setState({
      anchorEl: event.currentTarget,
    });
  }

  /**
   * @private
   */
  handleMenuClose() {
    this.setState({
      anchorEl: null,
    });
  }

  /**
   * Returns the rendered component
  */
  render() {
    const { t } = this.props;
    const { anchorEl } = this.state;

    return (
      <>
        <MiradorMenuButton
          aria-label={t('workspaceOptions')}
          onClick={this.handleMenuClick}
        >
          <MoreHorizontalIcon />
        </MiradorMenuButton>

        <WorkspaceOptionsMenu
          anchorEl={anchorEl}
          handleClose={this.handleMenuClose}
        />
      </>
    );
  }
}

WorkspaceOptionsButton.propTypes = {
  t: PropTypes.func.isRequired,
};
