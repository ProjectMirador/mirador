import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/LockSharp';
import SanitizedHtml from '../containers/SanitizedHtml';
import { PluginHook } from './PluginHook';

/** */
export class WindowAuthenticationBar extends Component {
  /** */
  constructor(props) {
    super(props);

    this.state = { open: false };
    this.setOpen = this.setOpen.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /** */
  onSubmit() {
    const { onConfirm } = this.props;
    this.setOpen(false);
    onConfirm();
  }

  /** Toggle the full description */
  setOpen(open) {
    this.setState(state => ({ ...state, open }));
  }

  /** */
  render() {
    const {
      classes, confirmButton, continueLabel,
      header, description, icon, label, t,
      ruleSet, hasLogoutService, status, ConfirmProps,
    } = this.props;

    if (status === 'ok' && !hasLogoutService) return null;

    const { open } = this.state;

    const button = (
      <Button onClick={this.onSubmit} className={classes.buttonInvert} autoFocus color="secondary" {...ConfirmProps}>
        {confirmButton || t('login')}
      </Button>
    );

    if (!description && !header) {
      return (
        <Paper square elevation={4} color="secondary" classes={{ root: classes.paper }}>
          <div className={classes.topBar}>
            { icon || <LockIcon className={classes.icon} /> }
            <Typography className={classes.label} component="h3" variant="body1" color="inherit">
              <SanitizedHtml htmlString={label} ruleSet={ruleSet} />
            </Typography>
            <PluginHook {...this.props} />
            { button }
          </div>
        </Paper>
      );
    }

    return (
      <Paper square elevation={4} color="secondary" classes={{ root: classes.paper }}>
        <Button fullWidth className={classes.topBar} onClick={() => this.setOpen(true)} component="div" color="inherit">
          { icon || <LockIcon className={classes.icon} /> }
          <Typography className={classes.label} component="h3" variant="body1" color="inherit">
            <SanitizedHtml htmlString={label} ruleSet="iiif" />
          </Typography>
          <PluginHook {...this.props} />
          <span className={classes.fauxButton}>
            { !open && (
              <Typography variant="button" color="inherit">
                { continueLabel || t('continue') }
              </Typography>
            )}
          </span>
        </Button>
        <Collapse
          in={open}
          onClose={() => this.setOpen(false)}
        >
          <Typography variant="body1" color="inherit" className={classes.expanded}>
            <SanitizedHtml htmlString={header} ruleSet={ruleSet} />
            { header && description ? ': ' : '' }
            <SanitizedHtml htmlString={description} ruleSet={ruleSet} />
          </Typography>
          <DialogActions>
            <Button onClick={() => this.setOpen(false)} color="inherit">
              { t('cancel') }
            </Button>

            { button }
          </DialogActions>
        </Collapse>
      </Paper>
    );
  }
}

WindowAuthenticationBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  confirmButton: PropTypes.string,
  ConfirmProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  continueLabel: PropTypes.string,
  description: PropTypes.node,
  hasLogoutService: PropTypes.bool,
  header: PropTypes.node,
  icon: PropTypes.node,
  label: PropTypes.node.isRequired,
  onConfirm: PropTypes.func.isRequired,
  ruleSet: PropTypes.string,
  status: PropTypes.string,
  t: PropTypes.func,
};

WindowAuthenticationBar.defaultProps = {
  confirmButton: undefined,
  ConfirmProps: {},
  continueLabel: undefined,
  description: undefined,
  hasLogoutService: true,
  header: undefined,
  icon: undefined,
  ruleSet: 'iiif',
  status: undefined,
  t: k => k,
};
