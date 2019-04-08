import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MiradorIcon from './icons/MiradorIcon';
import { version } from '../../package.json';

/**
 * Opens a new window for click
 */
export class Branding extends Component {
  /** */
  render() {
    const { t, variant, ...ContainerProps } = this.props;

    /**
    login, clickthrough/kiosk open @id, wait for close
    external, no-op
    */
    return (
      <div {...ContainerProps}>
        { variant === 'wide' && (
        <div>
          <Typography align="center" component="p" variant="h3">{t('mirador')}</Typography>
          <Typography align="center" variant="caption">{t('version', { version })}</Typography>
        </div>
        )}
        <Typography align="center">
          <IconButton
            align="center"
            component="a"
            href="http://projectmirador.org"
          >
            <MiradorIcon fontSize="large" />
          </IconButton>
        </Typography>
      </div>
    );
  }
}

Branding.propTypes = {
  t: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'wide']),
};

Branding.defaultProps = {
  t: k => k,
  variant: 'default',
};
