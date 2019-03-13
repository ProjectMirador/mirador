import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeftSharp';
import ArrowRightIcon from '@material-ui/icons/ArrowRightSharp';
import CompanionWindowFactory from '../containers/CompanionWindowFactory';
import { MiradorMenuButton } from './MiradorMenuButton';
import ns from '../config/css-ns';

/** */
export class CompanionArea extends Component {
  /** */
  areaLayoutClass() {
    const {
      classes, position,
    } = this.props;

    return position === 'bottom' ? classes.horizontal : null;
  }

  /** */
  render() {
    const {
      classes, companionWindows, companionAreaOpen, setCompanionAreaOpen,
      position, sideBarOpen, t, windowId,
    } = this.props;

    return (
      <div className={[classes.root, this.areaLayoutClass()].join(' ')}>
        {
          setCompanionAreaOpen && position === 'left' && sideBarOpen && companionWindows.length > 0
          && (
            <MiradorMenuButton
              aria-label={companionAreaOpen ? t('collapseSidePanel') : t('expandSidePanel')}
              className={classes.toggle}
              onClick={() => { setCompanionAreaOpen(windowId, !companionAreaOpen); }}
            >
              {companionAreaOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
            </MiradorMenuButton>
          )
        }
        <div className={[ns('companion-windows'), this.areaLayoutClass()].join(' ')} style={{ display: companionAreaOpen && (position !== 'left' || sideBarOpen) ? 'flex' : 'none' }}>
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
  position: PropTypes.string.isRequired,
  windowId: PropTypes.string.isRequired,
  companionWindows: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  sideBarOpen: PropTypes.bool,
  companionAreaOpen: PropTypes.bool,
  setCompanionAreaOpen: PropTypes.func,
  t: PropTypes.func.isRequired,
};

CompanionArea.defaultProps = {
  sideBarOpen: false,
  companionAreaOpen: true,
  setCompanionAreaOpen: () => {},
  classes: {},
};
