import PropTypes from 'prop-types';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

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
    container,
    dispatch,
    BadgeProps,
    TooltipProps,
    sx,
    ...iconButtonProps
  } = props;

  const button = (
    <IconButton
      {...iconButtonProps}
      sx={{
        fill: 'currentcolor',
        ...sx,
      }}
      size="large"
    >
      {badge
        ? (
          <Badge
            sx={{
              '.MuiBadge-badge': {
                paddingLeft: 1.5,
              },
            }}
            overlap="rectangular"
            {...BadgeProps}
          >
            {children}
          </Badge>
        )
        : children}
    </IconButton>
  );

  if (iconButtonProps.disabled) return button;

  return (
    <Tooltip
      PopperProps={{
        container: container?.current,
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
  container: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  dispatch: PropTypes.func,
  sx: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  TooltipProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

MiradorMenuButton.defaultProps = {
  badge: false,
  BadgeProps: {},
  container: null,
  dispatch: () => {},
  sx: {},
  TooltipProps: {},
};
