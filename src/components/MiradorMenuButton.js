import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const Root = styled(IconButton, { name: 'MiradorMenuButton', slot: 'root' })(({ selected, theme }) => ({
  fill: 'currentcolor',
  ...(selected && {
    backgroundColor: theme.palette.action.selected,
  }),
}));

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
    selected,
    BadgeProps,
    TooltipProps,
    sx,
    ...iconButtonProps
  } = props;

  const button = (
    <Root
      selected={selected}
      {...iconButtonProps}
      sx={sx}
      size="large"
    >
      {badge
        ? (
          <Badge
            overlap="rectangular"
            {...BadgeProps}
          >
            {children}
          </Badge>
        )
        : children}
    </Root>
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
  selected: PropTypes.bool,
  sx: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  TooltipProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

MiradorMenuButton.defaultProps = {
  badge: false,
  BadgeProps: {},
  container: null,
  dispatch: () => {},
  selected: false,
  sx: {},
  TooltipProps: {},
};
