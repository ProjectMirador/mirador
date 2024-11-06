import { Children, cloneElement } from 'react';
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

const Root = styled(Paper, { name: 'CompanionWindow', slot: 'root' })({});
const StyledToolbar = styled(Toolbar, { name: 'CompanionWindow', slot: 'toolbar' })({});
const StyledTitle = styled(Typography, { name: 'CompanionWindow', slot: 'title' })({});
const StyledTitleControls = styled('div', { name: 'CompanionWindow', slot: 'controls' })({});
const Contents = styled(Paper, { name: 'CompanionWindow', slot: 'contents' })({});
const StyledRnd = styled(Rnd, { name: 'CompanionWindow', slot: 'resize' })({});
const StyledPositionButton = styled(MiradorMenuButton, { name: 'CompanionWindow', slot: 'positionButton' })({});
const StyledCloseButton = styled(MiradorMenuButton, { name: 'CompanionWindow', slot: 'closeButton' })({});

/**
 * CompanionWindow
 */
export function CompanionWindow(props) {
  /** */
  const openInNewStyle = () => {
    const { direction } = props;
    if (direction === 'rtl') return { transform: 'scale(-1, 1)' };
    return {};
  };

  /** */
  const resizeHandles = () => {
    const { direction, position } = props;
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
  };
  const {
    ariaLabel, classes, paperClassName, onCloseClick, updateCompanionWindow, isDisplayed,
    position, t, title, children, titleControls, size,
    defaultSidebarPanelWidth, defaultSidebarPanelHeight, innerRef,
  } = props;

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
    <Root
      ownerState={props}
      ref={innerRef}
      style={{
        display: isDisplayed ? null : 'none',
        order: position === 'left' ? -1 : null,
      }}
      className={[ns(`companion-window-${position}`), paperClassName, position === 'bottom' ? classes.horizontal : classes.vertical].join(' ')}
      square
      component="aside"
      aria-label={ariaLabel || title}
    >
      <StyledRnd
        style={{ display: 'inherit', position: 'inherit' }}
        ownerState={props}
        default={{
          height: isBottom ? defaultSidebarPanelHeight : '100%',
          width: isBottom ? 'auto' : defaultSidebarPanelWidth,
        }}
        disableDragging
        enableResizing={resizeHandles()}
        minHeight={50}
        minWidth={position === 'left' ? 235 : 100}
      >

        <StyledToolbar
          variant="dense"
          className={[ns('companion-window-header'), size.width < 370 ? 'test' : null].join(' ')}
          disableGutters
        >
          <StyledTitle variant="h3">{title}</StyledTitle>
          {
            position === 'left'
              ? updateCompanionWindow
              && (
                <MiradorMenuButton
                  aria-label={t('openInCompanionWindow')}
                  onClick={() => { updateCompanionWindow({ position: 'right' }); }}
                >
                  <OpenInNewIcon style={openInNewStyle()} />
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
                      ...(size.width < 370 && {
                        order: 'unset',
                      }),
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
                ownerState={{ position }}
                sx={{
                  order: isBottom || size.width < 370 ? 'unset' : 1000,
                }}
                className={ns('companion-window-title-controls')}
              >
                {titleControls}
              </StyledTitleControls>
            )
          }
        </StyledToolbar>
        <Contents
          className={ns('scrollto-scrollable')}
          elevation={0}
        >
          {childrenWithAdditionalProps}
        </Contents>
      </StyledRnd>
    </Root>
  );
}

CompanionWindow.propTypes = {
  ariaLabel: PropTypes.string,
  children: PropTypes.node,
  classes: PropTypes.objectOf(PropTypes.string),
  defaultSidebarPanelHeight: PropTypes.number,
  defaultSidebarPanelWidth: PropTypes.number,
  direction: PropTypes.string.isRequired,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
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
  classes: {},
  defaultSidebarPanelHeight: 201,
  defaultSidebarPanelWidth: 235,
  innerRef: undefined,
  isDisplayed: false,
  onCloseClick: () => { },
  paperClassName: '',
  position: null,
  size: {},
  t: key => key,
  title: null,
  titleControls: null,
  updateCompanionWindow: undefined,
};
