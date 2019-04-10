import React, { Component } from 'react';
import SettingsIcon from '@material-ui/icons/SettingsSharp';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import WorkspaceMenu from '../containers/WorkspaceMenu';
import MiradorMenuButton from '../containers/MiradorMenuButton';

/**
 */
export class WorkspaceMenuButton extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
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
   * render
   * @return
   */
  render() {
    const { classes, t } = this.props;
    const { anchorEl } = this.state;

    return (
      <>
        <MiradorMenuButton
          aria-haspopup="true"
          aria-label={t('workspaceMenu')}
          aria-owns={anchorEl ? 'workspace-menu' : undefined}
          className={classNames(classes.ctrlBtn, (anchorEl ? classes.ctrlBtnSelected : null))}
          id="menuBtn"
          onClick={this.handleMenuClick}
        >
          <SettingsIcon />
        </MiradorMenuButton>
        <WorkspaceMenu
          anchorEl={anchorEl}
          handleClose={this.handleMenuClose}
        />
      </>
    );
  }
}

WorkspaceMenuButton.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
};

WorkspaceMenuButton.defaultProps = {
  t: key => key,
};
