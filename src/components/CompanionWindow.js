import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/CloseSharp';
import OpenWith from '@material-ui/icons/OpenWithSharp';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ns from '../config/css-ns';
import WindowSideBarInfoPanel from '../containers/WindowSideBarInfoPanel';
import WindowSideBarCanvasPanel from '../containers/WindowSideBarCanvasPanel';

/**
 * CompanionWindow
 */
export class CompanionWindow extends Component {
  /**
   * activePanelComponent
   * @return React Component
   */
  activePanelComponent() {
    const { content, windowId } = this.props;

    switch (content) {
      case 'info':
        return <WindowSideBarInfoPanel windowId={windowId} />;
      case 'canvas_navigation':
        return <WindowSideBarCanvasPanel windowId={windowId} />;
      default:
        return null;
    }
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      classes, onCloseClick, position, t, toggleAreaOfCompanionWindow,
    } = this.props;

    return (
      <div className={ns(`companion-window-${position}`)}>
        <div className={classes.navigation}>
          <IconButton
            aria-label={t('toggleAreaOfCompanionWindow')}
            onClick={toggleAreaOfCompanionWindow}
          >
            <OpenWith />
          </IconButton>

          <IconButton
            aria-label={t('closeCompanionWindow')}
            onClick={onCloseClick}
          >
            <CloseIcon />
          </IconButton>

          <Divider />
        </div>

        <Paper
          className={classes.content}
          square
        >
          {this.activePanelComponent()}
        </Paper>
      </div>
    );
  }
}

CompanionWindow.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types,
  content: PropTypes.string,
  id: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  windowId: PropTypes.string.isRequired,
  onCloseClick: PropTypes.func,
  position: PropTypes.string,
  t: PropTypes.func,
  toggleAreaOfCompanionWindow: PropTypes.func.isRequired,
};

CompanionWindow.defaultProps = {
  content: null,
  onCloseClick: () => {},
  position: null,
  t: key => key,
};
