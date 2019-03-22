import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      classes, companionWindows, companionAreaOpen, setCompanionAreaOpen,
      position, sideBarOpen, t, windowId,
    } = this.props;

    return (
      <div className={[classes.root, this.areaLayoutClass(), ns(`companion-area-${position}`)].join(' ')}>
        {
          setCompanionAreaOpen && position === 'left' && sideBarOpen && companionWindows.length > 0
          && (
            <MiradorMenuButton
              aria-label={companionAreaOpen ? t('collapseSidePanel') : t('expandSidePanel')}
              className={classes.toggle}
              onClick={() => { setCompanionAreaOpen(windowId, !companionAreaOpen); }}
              TooltipProps={{
                style: {
                  position: 'absolute',
                  right: '0',
                },
              }}
            >
              {companionAreaOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
            </MiradorMenuButton>
          )
        }
        <div className={[ns('companion-windows'), this.areaLayoutClass()].join(' ')} style={{ display: companionAreaOpen ? 'flex' : 'none' }}>
          {
            companionWindows.map(cw => (
              <CompanionWindowFactory id={cw.id} key={cw.id} windowId={windowId} />
            ))
          }
        </div>
      </div>
    );
  }
}

CompanionArea.propTypes = {
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  companionAreaOpen: PropTypes.bool.isRequired,
  companionWindows: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
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
