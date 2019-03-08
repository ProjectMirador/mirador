import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeftSharp';
import ArrowRightIcon from '@material-ui/icons/ArrowRightSharp';
import CompanionWindowFactory from '../containers/CompanionWindowFactory';
import ns from '../config/css-ns';

/** */
export class CompanionArea extends Component {
  /** */
  render() {
    const {
      classes, companionWindows, companionAreaOpen, setCompanionAreaOpen,
      position, sideBarOpen, windowId,
    } = this.props;

    return (
      <div className={classes.root} style={{ minHeight: 0, display: 'flex' }}>
        {
          setCompanionAreaOpen && position === 'left' && sideBarOpen && companionWindows.length > 0
          && (
            <IconButton
              className={classes.toggle}
              onClick={() => { setCompanionAreaOpen(windowId, !companionAreaOpen); }}
            >
              { companionAreaOpen ? <ArrowLeftIcon /> : <ArrowRightIcon /> }
            </IconButton>
          )
        }
        <div className={[ns('companion-windows'), position === 'bottom' ? classes.horizontal : null].join(' ')} style={{ display: companionAreaOpen && (position !== 'left' || sideBarOpen) ? 'flex' : 'none' }}>
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
};

CompanionArea.defaultProps = {
  sideBarOpen: false,
  companionAreaOpen: true,
  setCompanionAreaOpen: () => {},
  classes: {},
};
