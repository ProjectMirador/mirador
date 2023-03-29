import { Children, cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/CloseSharp';
import OpenInNewIcon from '@mui/icons-material/OpenInNewSharp';
import MoveIcon from '@mui/icons-material/DragIndicatorSharp';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { Rnd } from 'react-rnd';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import ns from '../config/css-ns';

/**
 * CompanionWindow
 */
export class CompanionWindow extends Component {
  /** */
  openInNewStyle() {
    const { direction } = this.props;
    if (direction === 'rtl') return { transform: 'scale(-1, 1)' };
    return {};
  }

  /** */
  resizeHandles() {
    const { direction, position } = this.props;
    const positions = {
      ltr: {
        default: 'left',
        opposite: 'right',
      },
      rtl: {
        default: 'right',
        opposite: 'left',
      },
    };

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
      return { ...base, [positions[direction].default]: true };
    }

    if (position === 'left') {
      return { ...base, [positions[direction].opposite]: true };
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
      ariaLabel, classes, paperClassName, onCloseClick, updateCompanionWindow, isDisplayed,
      position, t, title, children, titleControls, size,
      defaultSidebarPanelWidth, defaultSidebarPanelHeight,
    } = this.props;

    const isBottom = (position === 'bottom' || position === 'far-bottom');

    const childrenWithAdditionalProps = Children.map(children, (child) => {
      if (!child) return null;
      return cloneElement(
        child,
        {
          parentactions: {
            closeCompanionWindow: onCloseClick,
          },
        },
      );
    });

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
            height: isBottom ? defaultSidebarPanelHeight : '100%',
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
                      onClick={() => { updateCompanionWindow({ position: 'right' }); }}
                    >
                      <OpenInNewIcon style={this.openInNewStyle()} />
                    </MiradorMenuButton>
                  )
                : (
                  <>
                    {
                      updateCompanionWindow && (
                        <MiradorMenuButton
                          aria-label={position === 'bottom' ? t('moveCompanionWindowToRight') : t('moveCompanionWindowToBottom')}
                          className={classes.positionButton}
                          onClick={() => { updateCompanionWindow({ position: position === 'bottom' ? 'right' : 'bottom' }); }}
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
          <Paper
            className={[classes.content, ns('scrollto-scrollable')].join(' ')}
            elevation={0}
          >
            {childrenWithAdditionalProps}
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
  defaultSidebarPanelHeight: PropTypes.number,
  defaultSidebarPanelWidth: PropTypes.number,
  direction: PropTypes.string.isRequired,
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
};

CompanionWindow.defaultProps = {
  ariaLabel: undefined,
  children: undefined,
  defaultSidebarPanelHeight: 201,
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
