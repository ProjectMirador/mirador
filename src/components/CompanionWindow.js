import { Children, cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/CloseSharp';
import OpenInNewIcon from '@mui/icons-material/OpenInNewSharp';
import MoveIcon from '@mui/icons-material/DragIndicatorSharp';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { Rnd } from 'react-rnd';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import ns from '../config/css-ns';

const StyledRnd = styled(Rnd)(() => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
  position: 'relative',
}));

const StyledPositionButton = styled(MiradorMenuButton)(() => ({
  marginLeft: -16,
  order: -100,
  width: 24,
}));

const StyledCloseButton = styled(MiradorMenuButton)(() => ({
  order: 4,
}));

const StyledTitleControls = styled('div')(() => ({
  alignItems: 'center',
  display: 'flex',
  flexFlow: 'row wrap',
  minHeight: 48,
  order: 3,
}));

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
      ariaLabel, paperClassName, onCloseClick, updateCompanionWindow, isDisplayed,
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
        sx={{
          borderLeft: position === 'right' && '0.5px solid',
          borderLeftColor: position === 'right' && 'divider',
          borderRight: position === 'left' && '0.5px solid',
          borderRightColor: position === 'left' && 'divider',
          borderTop: position === 'bottom' && '0.5px solid',
          borderTopColor: position === 'bottom' && 'divider',
          boxShadow: 'none',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        }}
        style={{
          display: isDisplayed ? null : 'none',
          order: position === 'left' ? -1 : null,
        }}
        className={[ns(`companion-window-${position}`), paperClassName].join(' ')}
        square
        component="aside"
        aria-label={ariaLabel || title}
      >
        <StyledRnd
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
            sx={{
              alignItems: 'flex-start',
              background: 'shades?.light',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              minHeight: 'max-content',
              paddingLeft: 2,
            }}
            className={ns('companion-window-header')}
            disableGutters
          >
            <Typography
              variant="h3"
              sx={{
                alignSelf: 'center',
                flexGrow: 1,
                typography: 'subtitle1',
                width: 160,
              }}
            >
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
                        <StyledPositionButton
                          aria-label={position === 'bottom' ? t('moveCompanionWindowToRight') : t('moveCompanionWindowToBottom')}
                          onClick={() => { updateCompanionWindow({ position: position === 'bottom' ? 'right' : 'bottom' }); }}
                        >
                          <MoveIcon />
                        </StyledPositionButton>
                      )
                    }
                    <StyledCloseButton
                      sx={{
                        order: size.width < 370 && 'unset',
                      }}
                      aria-label={t('closeCompanionWindow')}
                      onClick={onCloseClick}
                    >
                      <CloseIcon />
                    </StyledCloseButton>
                  </>
                )
            }
            {
              titleControls && (
                <StyledTitleControls
                  sx={{
                    flexGrow: !isBottom && 1,
                    order: isBottom || size.width < 370 ? 'unset' : 1000,
                  }}
                  className={ns('companion-window-title-controls')}
                >
                  {titleControls}
                </StyledTitleControls>
              )
            }
          </Toolbar>
          <Paper
            sx={{
              overflowY: 'auto',
              wordBreak: 'break-word',
            }}
            className={ns('scrollto-scrollable')}
            elevation={0}
          >
            {childrenWithAdditionalProps}
          </Paper>
        </StyledRnd>
      </Paper>
    );
  }
}

CompanionWindow.propTypes = {
  ariaLabel: PropTypes.string,
  children: PropTypes.node,
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
