import React, { Component } from 'react';
import BookmarksIcon from '@material-ui/icons/BookmarksSharp';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import WindowList from '../containers/WindowList';
import MiradorMenuButton from '../containers/MiradorMenuButton';

/**
 * WindowListButton ~
*/
export class WindowListButton extends Component {
  /** */
  constructor(props) {
    super(props);

    this.state = { windowListAnchor: null };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  /** Set the windowListAnchor to null on window close */
  handleClose() {
    this.setState({ windowListAnchor: null });
  }

  /** Set the windowListAnchor to the event's current target  */
  handleOpen(event) {
    this.setState({ windowListAnchor: event.currentTarget });
  }

  /**
   * Returns the rendered component
  */
  render() {
    const {
      classes, disabled, t, windowCount,
    } = this.props;
    const { windowListAnchor } = this.state;

    return (
      <>
        <MiradorMenuButton
          aria-haspopup="true"
          aria-label={t('listAllOpenWindows')}
          aria-owns={windowListAnchor ? 'window-list' : null}
          className={
            classNames(classes.ctrlBtn, (windowListAnchor ? classes.ctrlBtnSelected : null))
          }
          disabled={disabled}
          badge
          BadgeProps={{ badgeContent: windowCount, classes: { badge: classes.badge } }}
          onClick={e => this.handleOpen(e)}
        >
          <BookmarksIcon />
        </MiradorMenuButton>

        {Boolean(windowListAnchor) && (
          <WindowList
            anchorEl={windowListAnchor}
            id="window-list"
            open={Boolean(windowListAnchor)}
            handleClose={this.handleClose}
          />
        )}
      </>
    );
  }
}

WindowListButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  disabled: PropTypes.bool,
  t: PropTypes.func.isRequired,
  windowCount: PropTypes.number.isRequired,
};
WindowListButton.defaultProps = {
  classes: {},
  disabled: false,
};
