import React, { Component } from 'react';
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
  render() {
    const {
      classes, companionWindowIds, companionAreaOpen, setCompanionAreaOpen,
      position, sideBarOpen, t, windowId,
    } = this.props;

    return (
      <div className={[classes.root, this.areaLayoutClass(), ns(`companion-area-${position}`)].join(' ')}>
        {
          setCompanionAreaOpen && position === 'left' && sideBarOpen && companionWindowIds.length > 0
          && (
            <MiradorMenuButton
              aria-label={companionAreaOpen ? t('collapseSidePanel') : t('expandSidePanel')}
              className={classes.toggle}
              onClick={() => { setCompanionAreaOpen(windowId, !companionAreaOpen); }}
              TooltipProps={{
                placement: 'right',
                style: {
                  left: '100%',
                  position: 'absolute',
                },
              }}
            >
              {companionAreaOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
            </MiradorMenuButton>
          )
        }
        <Slide in={companionAreaOpen} direction="right">
          <div className={[ns('companion-windows'), companionWindowIds.length > 0 && classes[position], this.areaLayoutClass()].join(' ')} style={{ display: companionAreaOpen ? 'flex' : 'none' }}>
            {
              companionWindowIds.map(id => (
                <CompanionWindowFactory id={id} key={id} windowId={windowId} />
              ))
            }
          </div>
        </Slide>
      </div>
    );
  }
}

CompanionArea.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  companionAreaOpen: PropTypes.bool.isRequired,
  companionWindowIds: PropTypes.arrayOf(PropTypes.string).isRequired,
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
