import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/CloseSharp';
import OpenInNewIcon from '@material-ui/icons/OpenInNewSharp';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import ThumbnailNavigationBottomIcon from './icons/ThumbnailNavigationBottomIcon';
import ThumbnailNavigationRightIcon from './icons/ThumbnailNavigationRightIcon';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import ns from '../config/css-ns';

/**
 * CompanionWindow
 */
export class CompanionWindow extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      classes, paperClassName, id, onCloseClick, updateCompanionWindow, isDisplayed,
      position, t, windowId, title, children, titleControls,
    } = this.props;

    return (
      <Paper
        className={[classes.root, position === 'bottom' ? classes.horizontal : classes.vertical, classes[`companionWindow-${position}`], ns(`companion-window-${position}`), paperClassName].join(' ')}
        style={{
          display: isDisplayed ? null : 'none',
          order: position === 'left' ? -1 : null,
        }}
        square
        component="aside"
        aria-label={title}
      >
        <Toolbar className={[classes.toolbar, position === 'left' ? classes.leftPadding : undefined, ns('companion-window-header')].join(' ')} disableGutters>
          <Typography variant="h3" className={classes.windowSideBarTitle}>
            {title}
          </Typography>
          {
            titleControls && (
              <div className={ns('companion-window-title-controls')}>
                {titleControls}
              </div>
            )
          }
          {
            position === 'left'
              ? updateCompanionWindow
                && (
                  <MiradorMenuButton
                    aria-label={t('openInCompanionWindow')}
                    onClick={() => { updateCompanionWindow(windowId, id, { position: 'right' }); }}
                  >
                    <OpenInNewIcon />
                  </MiradorMenuButton>
                )
              : (
                <>
                  {
                    updateCompanionWindow && (
                      <MiradorMenuButton
                        aria-label={position === 'bottom' ? t('moveCompanionWindowToRight') : t('moveCompanionWindowToBottom')}
                        className={classes.positionButton}
                        onClick={() => { updateCompanionWindow(windowId, id, { position: position === 'bottom' ? 'right' : 'bottom' }); }}
                      >
                        {position === 'bottom' ? <ThumbnailNavigationRightIcon /> : <ThumbnailNavigationBottomIcon />}
                      </MiradorMenuButton>
                    )
                  }
                  <MiradorMenuButton
                    aria-label={t('closeCompanionWindow')}
                    className={classes.closeButton}
                    onClick={onCloseClick}
                  >
                    <CloseIcon />
                  </MiradorMenuButton>
                </>
              )
          }
        </Toolbar>
        <Paper className={classes.content} elevation={0}>
          {children}
        </Paper>
      </Paper>
    );
  }
}

CompanionWindow.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types,
  id: PropTypes.string.isRequired,
  isDisplayed: PropTypes.bool,
  onCloseClick: PropTypes.func,
  paperClassName: PropTypes.string,
  position: PropTypes.string,
  t: PropTypes.func,
  title: PropTypes.string,
  titleControls: PropTypes.node,
  updateCompanionWindow: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

CompanionWindow.defaultProps = {
  children: undefined,
  isDisplayed: false,
  onCloseClick: () => {},
  paperClassName: '',
  position: null,
  t: key => key,
  title: null,
  titleControls: null,
  updateCompanionWindow: undefined,
};
