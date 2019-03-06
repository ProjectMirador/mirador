import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/CloseSharp';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNewSharp';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import ns from '../config/css-ns';

/**
 * CompanionWindow
 */
export class CompanionWindow extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      classes, paperClassName, id, onCloseClick, updateCompanionWindow, isDisplayed,
      position, t, windowId, title, children,
    } = this.props;

    return (
      <Paper
        className={[classes.root, ns(`companion-window-${position}`), paperClassName].join(' ')}
        style={{
          display: isDisplayed ? null : 'none',
          order: position === 'left' ? -1 : null,
        }}
        square
        component="aside"
        aria-label={title}
      >
        <Toolbar variant="dense" className={ns('companion-window-header')}>
          <Typography variant="h3" className={classes.windowSideBarTitle}>
            {title}
          </Typography>
          {
            position === 'left'
              ? updateCompanionWindow
                && (
                  <IconButton
                    aria-label={t('openInCompanionWindow')}
                    onClick={() => { updateCompanionWindow(windowId, id, { position: 'right' }); }}
                  >
                    <OpenInNewIcon />
                  </IconButton>
                )
              : (
                <IconButton
                  aria-label={t('closeCompanionWindow')}
                  className={classes.closeButton}
                  onClick={() => { onCloseClick(windowId, id); }}
                >
                  <CloseIcon />
                </IconButton>
              )
          }
        </Toolbar>
        <Paper className={classes.content} elevation={0}>
          {children}
        </Paper>
      </Paper>
    );
  }
}

CompanionWindow.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types,
  paperClassName: PropTypes.string,
  id: PropTypes.string.isRequired,
  onCloseClick: PropTypes.func,
  updateCompanionWindow: PropTypes.func,
  position: PropTypes.string,
  isDisplayed: PropTypes.bool,
  t: PropTypes.func,
  title: PropTypes.string,
  windowId: PropTypes.string.isRequired,
  children: PropTypes.node,
};

CompanionWindow.defaultProps = {
  paperClassName: '',
  onCloseClick: () => {},
  updateCompanionWindow: undefined,
  isDisplayed: false,
  position: null,
  title: null,
  t: key => key,
  children: undefined,
};
