import { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MiradorIcon from './icons/MiradorIcon';

/**
 * Display a branding icon
 */
export class Branding extends Component {
  /** */
  render() {
    const { t, variant, ...ContainerProps } = this.props;

    return (
      <div {...ContainerProps}>
        { variant === 'wide' && (
        <div>
          <Typography align="center" component="p" variant="h3">{t('mirador')}</Typography>
        </div>
        )}
        <Typography align="center">
          <IconButton
            component="a"
            href="https://projectmirador.org"
            target="_blank"
            rel="noopener"
            size="large">
            <MiradorIcon aria-label={t('aboutMirador')} titleAccess={t('aboutMirador')} fontSize="large" />
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
