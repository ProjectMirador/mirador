import { Component } from 'react';
import SettingsIcon from '@mui/icons-material/SettingsSharp';
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
   * render
   * @return
   */
  render() {
    const { classes, t } = this.props;
    const { anchorEl, open } = this.state;

    return (
      <>
        <MiradorMenuButton
          aria-haspopup="true"
          aria-label={t('workspaceMenu')}
          aria-owns={open ? 'workspace-menu' : undefined}
          className={classNames(classes.ctrlBtn, (open ? classes.ctrlBtnSelected : null))}
          id="menuBtn"
          onClick={this.handleMenuClick}
        >
          <SettingsIcon />
        </MiradorMenuButton>
        <WorkspaceMenu
          anchorEl={anchorEl}
          id="workspace-menu"
          handleClose={this.handleMenuClose}
          open={open}
        />
      </>
    );
  }
}

WorkspaceMenuButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  t: PropTypes.func,
};

WorkspaceMenuButton.defaultProps = {
  t: key => key,
};
