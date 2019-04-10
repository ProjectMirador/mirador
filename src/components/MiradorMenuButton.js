import React from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ns from '../config/css-ns';

/**
 * MiradorMenuButton ~ Wrap the given icon prop in an IconButton and a Tooltip.
 * This shares the passed in aria-label w/ the Tooltip (as title) and the IconButton
 * All props besides icon are spread to the IconButton component
*/
export function MiradorMenuButton(props) {
  const { 'aria-label': ariaLabel } = props;
  const {
    badge,
    children,
    containerId,
    dispatch,
    BadgeProps,
    TooltipProps,
    ...iconButtonProps
  } = props;

  const button = (
    <IconButton {...iconButtonProps}>
      {badge
        ? <Badge {...BadgeProps}>{children}</Badge>
        : children
      }
    </IconButton>
  );

  if (iconButtonProps.disabled) return button;

  return (
    <Tooltip
      PopperProps={{
        container: document.querySelector(`#${containerId} .${ns('viewer')}`),
      }}
      title={ariaLabel}
      {...TooltipProps}
    >
      {button}
    </Tooltip>
  );
}

MiradorMenuButton.propTypes = {
  'aria-label': PropTypes.string.isRequired,
  badge: PropTypes.bool,
  BadgeProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.element.isRequired,
  containerId: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  TooltipProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

MiradorMenuButton.defaultProps = {
  badge: false,
  BadgeProps: {},
  dispatch: () => {},
  TooltipProps: {},
};
