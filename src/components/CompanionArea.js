import { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeftSharp';
import ArrowRightIcon from '@mui/icons-material/ArrowRightSharp';
import CompanionWindowFactory from '../containers/CompanionWindowFactory';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import ns from '../config/css-ns';

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: 0,
  position: 'relative',
  zIndex: theme.zIndex.appBar - 2,
}));

const StyledWrapper = styled('div')(() => ({
}));

const StyledToggle = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.shades?.dark}`,
  borderRadius: 0,
  height: '48px',
  left: '100%',
  marginTop: '1rem',
  padding: 2,
  position: 'absolute',
  width: '23px',
  zIndex: theme.zIndex.drawer,
}));

const StyledToggleButton = styled(MiradorMenuButton)({
  marginBottom: 12,
  marginTop: 12,
  padding: 0,
});

/** */
export class CompanionArea extends Component {
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
      companionWindowIds, companionAreaOpen, setCompanionAreaOpen,
      position, sideBarOpen, t, windowId,
    } = this.props;

    return (
      <StyledRoot
        sx={{
          ...((position === 'bottom' || position === 'far-bottom') && {
            flexDirection: 'column',
            width: '100%',
          }),
        }}
        className={`companion-area-${position}`}
      >
        <Slide in={companionAreaOpen} direction={this.slideDirection()}>
          <StyledWrapper
            className={`${ns('companion-windows')} ${companionWindowIds.length > 0}`}
            style={{ display: companionAreaOpen ? 'flex' : 'none' }}
            sx={{
              ...((position === 'bottom' || position === 'far-bottom') && {
                flexDirection: 'column',
                width: '100%',
              }),
            }}
          >
            {companionWindowIds.map((id) => (
              <CompanionWindowFactory id={id} key={id} windowId={windowId} />
            ))}
          </StyledWrapper>
        </Slide>
        {setCompanionAreaOpen && position === 'left' && sideBarOpen && companionWindowIds.length > 0 && (
        <StyledToggle>
          <StyledToggleButton
            aria-expanded={companionAreaOpen}
            aria-label={companionAreaOpen ? t('collapseSidePanel') : t('expandSidePanel')}
            onClick={() => { setCompanionAreaOpen(windowId, !companionAreaOpen); }}
            TooltipProps={{ placement: 'right' }}
          >
            {this.collapseIcon()}
          </StyledToggleButton>
        </StyledToggle>
        )}
      </StyledRoot>
    );
  }
}

CompanionArea.propTypes = {
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
  setCompanionAreaOpen: () => {},
  sideBarOpen: false,
};
