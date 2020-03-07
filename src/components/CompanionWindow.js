import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/CloseSharp';
import OpenInNewIcon from '@material-ui/icons/OpenInNewSharp';
import MoveIcon from '@material-ui/icons/DragIndicatorSharp';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { Rnd } from 'react-rnd';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import ns from '../config/css-ns';

/**
 * CompanionWindow
 */
export class CompanionWindow extends Component {
  /** */
  resizeHandles() {
    const { position } = this.props;

    const base = {
      bottom: false,
      bottomLeft: false,
      bottomRight: false,
      left: false,
      right: false,
      top: false,
      topLeft: false,
      topRight: false,
    };

    if (position === 'right' || position === 'far-right') {
      return { ...base, left: true };
    }

    if (position === 'left') {
      return { ...base, right: true };
    }

    if (position === 'bottom' || position === 'far-bottom') {
      return { ...base, top: true };
    }

    return base;
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      ariaLabel, classes, paperClassName, id, onCloseClick, updateCompanionWindow, isDisplayed,
      position, t, windowId, title, children, titleControls, size, defaultSidebarPanelWidth,
    } = this.props;

    const isBottom = (position === 'bottom' || position === 'far-bottom');

    return (
      <Paper
        className={[classes.root, position === 'bottom' ? classes.horizontal : classes.vertical, classes[`companionWindow-${position}`], ns(`companion-window-${position}`), paperClassName].join(' ')}
        style={{
          display: isDisplayed ? null : 'none',
          order: position === 'left' ? -1 : null,
        }}
        square
        component="aside"
        aria-label={ariaLabel || title}
      >
        <Rnd
          className={[classes.rnd]}
          style={{ display: 'flex', position: 'relative' }}
          default={{
            height: isBottom ? 201 : '100%',
            width: isBottom ? 'auto' : defaultSidebarPanelWidth,
          }}
          disableDragging
          enableResizing={this.resizeHandles()}
          minHeight={50}
          minWidth={position === 'left' ? 235 : 100}
        >

          <Toolbar
            className={[
              classes.toolbar,
              classes.companionWindowHeader,
              size.width < 370 ? classes.small : null,
              ns('companion-window-header'),
            ].join(' ')}
            disableGutters
          >
            <Typography variant="h3" className={classes.windowSideBarTitle}>
              {title}
            </Typography>
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
                          <MoveIcon />
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
            {
              titleControls && (
                <div
                  className={[
                    classes.titleControls,
                    isBottom
                      ? classes.companionWindowTitleControlsBottom
                      : classes.companionWindowTitleControls,
                    ns('companion-window-title-controls'),
                  ].join(' ')}
                >
                  {titleControls}
                </div>
              )
            }
          </Toolbar>
          <Paper className={classes.content} elevation={0}>
            {children}
          </Paper>
        </Rnd>
      </Paper>
    );
  }
}

CompanionWindow.propTypes = {
  ariaLabel: PropTypes.string,
  children: PropTypes.node,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  defaultSidebarPanelWidth: PropTypes.number,
  id: PropTypes.string.isRequired,
  isDisplayed: PropTypes.bool,
  onCloseClick: PropTypes.func,
  paperClassName: PropTypes.string,
  position: PropTypes.string,
  size: PropTypes.shape({ width: PropTypes.number }),
  t: PropTypes.func,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  titleControls: PropTypes.node,
  updateCompanionWindow: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

CompanionWindow.defaultProps = {
  ariaLabel: undefined,
  children: undefined,
  defaultSidebarPanelWidth: 235,
  isDisplayed: false,
  onCloseClick: () => {},
  paperClassName: '',
  position: null,
  size: {},
  t: key => key,
  title: null,
  titleControls: null,
  updateCompanionWindow: undefined,
};
