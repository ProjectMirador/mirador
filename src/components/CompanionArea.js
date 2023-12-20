import { Component } from 'react';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeftSharp';
import ArrowRightIcon from '@material-ui/icons/ArrowRightSharp';
import CompanionWindowFactory from '../containers/CompanionWindowFactory';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import ns from '../config/css-ns';

/** */
export class CompanionArea extends Component {
  /** */
  areaLayoutClass() {
    const {
      classes, position,
    } = this.props;

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
      classes, companionWindowIds, companionAreaOpen, setCompanionAreaOpen,
      position, sideBarOpen, t, windowId,
    } = this.props;

    return (
      <div className={[classes.root, this.areaLayoutClass(), ns(`companion-area-${position}`)].join(' ')}>
        <Slide in={companionAreaOpen} direction={this.slideDirection()}>
          <div className={[ns('companion-windows'), companionWindowIds.length > 0 && classes[position], this.areaLayoutClass()].join(' ')} style={{ display: companionAreaOpen ? 'flex' : 'none' }}>
            {
              companionWindowIds.map(id => (
                <CompanionWindowFactory id={id} key={id} />
              ))
            }
          </div>
        </Slide>
        {
          setCompanionAreaOpen && position === 'left' && sideBarOpen && companionWindowIds.length > 0
          && (
            <div className={classes.toggle}>
              <MiradorMenuButton
                aria-expanded={companionAreaOpen}
                aria-label={companionAreaOpen ? t('collapseSidePanel') : t('expandSidePanel')}
                className={classes.toggleButton}
                key={companionAreaOpen ? 'collapse' : 'expand'}
                onClick={() => { setCompanionAreaOpen(windowId, !companionAreaOpen); }}
                TooltipProps={{ placement: 'right' }}
              >
                {this.collapseIcon()}
              </MiradorMenuButton>
            </div>
          )
        }
      </div>
    );
  }
}

CompanionArea.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
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
  setCompanionAreaOpen: () => {},
  sideBarOpen: false,
};
