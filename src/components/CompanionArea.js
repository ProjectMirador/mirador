import { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeftSharp';
import ArrowRightIcon from '@mui/icons-material/ArrowRightSharp';
import classNames from 'classnames';
import CompanionWindowFactory from '../containers/CompanionWindowFactory';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import ns from '../config/css-ns';

const Root = styled('div', { name: 'CompanionArea', slot: 'root' })(({ ownerState, theme }) => ({
  display: 'flex',
  minHeight: 0,
  position: 'relative',
  zIndex: theme.zIndex.appBar - 2,
  ...((ownerState.position === 'bottom' || ownerState.position === 'far-bottom') && {
    flexDirection: 'column',
    width: '100%',
  }),
}));

const Container = styled('div', { name: 'CompanionArea', slot: 'container' })(({ ownerState }) => ({
  display: ownerState?.companionAreaOpen ? 'flex' : 'none',
  ...((ownerState?.position === 'bottom' || ownerState?.position === 'far-bottom') && {
    flexDirection: 'column',
    width: '100%',
  }),
  ...((ownerState?.position === 'left' && (ownerState?.companionWindowIds && ownerState.companionWindowIds.length > 0)) && {
    minWidth: '235px',
  }),
}));

const StyledToggle = styled('div', { name: 'CompanionArea', slot: 'toggle' })(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.shades?.dark}`,
  borderInlineStart: 0,
  borderRadius: 0,
  display: 'inline-flex',
  height: '48px',
  left: '100%',
  marginTop: '1rem',
  overflow: 'hidden',
  padding: 2,
  position: 'absolute',
  width: '23px',
  zIndex: theme.zIndex.drawer,
}));

/** */
export class CompanionArea extends Component {
  /** */
  areaLayoutClass() {
    const { classes, position } = this.props;

    return (position === 'bottom' || position === 'far-bottom') ? classes.horizontal : null;
  }

  /** */
  collapseIcon() {
    const { companionAreaOpen, direction } = this.props;
    if (direction === 'rtl') {
      if (companionAreaOpen) return <ArrowRightIcon />;
      return <ArrowLeftIcon />;
    }

    if (companionAreaOpen) return <ArrowLeftIcon />;
    return <ArrowRightIcon />;
  }

  /** @private */
  slideDirection() {
    const { direction, position } = this.props;
    const defaultPosition = direction === 'rtl' ? 'left' : 'right';
    const oppositePosition = direction === 'rtl' ? 'right' : 'left';

    switch (position) {
      case 'right':
      case 'far-right':
        return oppositePosition;
      case 'bottom':
      case 'far-bottom':
        return 'up';
      default:
        return defaultPosition;
    }
  }

  /** */
  render() {
    const {
      className,
      companionWindowIds, companionAreaOpen, setCompanionAreaOpen,
      position, sideBarOpen, t, windowId,
    } = this.props;
    const classes = classNames(this.areaLayoutClass(), ns(`companion-area-${position}`), className);
    return (
      <Root ownerState={this.props} className={classes}>
        <Slide in={companionAreaOpen} direction={this.slideDirection()}>
          <Container
            ownerState={this.props}
            className={`${ns('companion-windows')}`}
          >
            {companionWindowIds.map((id) => (
              <CompanionWindowFactory id={id} key={id} windowId={windowId} />
            ))}
          </Container>
        </Slide>
        {setCompanionAreaOpen && position === 'left' && sideBarOpen && companionWindowIds.length > 0 && (
        <StyledToggle>
          <MiradorMenuButton
            aria-expanded={companionAreaOpen}
            aria-label={companionAreaOpen ? t('collapseSidePanel') : t('expandSidePanel')}
            edge="start"
            onClick={() => { setCompanionAreaOpen(windowId, !companionAreaOpen); }}
            TooltipProps={{ placement: 'right' }}
          >
            {this.collapseIcon()}
          </MiradorMenuButton>
        </StyledToggle>
        )}
      </Root>
    );
  }
}

CompanionArea.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
  companionAreaOpen: PropTypes.bool.isRequired,
  companionWindowIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  direction: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  setCompanionAreaOpen: PropTypes.func,
  sideBarOpen: PropTypes.bool,
  t: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

CompanionArea.defaultProps = {
  classes: {},
  className: undefined,
  setCompanionAreaOpen: () => {},
  sideBarOpen: false,
};
