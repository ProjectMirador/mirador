import PropTypes from 'prop-types';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';

const Root = styled(DialogContent, { name: 'ScrollIndicatedDialogContent', slot: 'root' })(({ theme }) => ({
  /* Shadow covers */
  background: `linear-gradient(${theme.palette.background.paper} 30%, rgba(255, 255, 255, 0)), `
    + `linear-gradient(rgba(255, 255, 255, 0), ${theme.palette.background.paper} 70%) 0 100%, `
    // Shaddows
    + 'radial-gradient(50% 0, farthest-side, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0)), '
    + 'radial-gradient(50% 100%, farthest-side, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0)) 0 100%,',
  /* Shadow covers */
  background: `linear-gradient(${theme.palette.background.paper} 30%, rgba(255, 255, 255, 0)), ` // eslint-disable-line no-dupe-keys
    + `linear-gradient(rgba(255, 255, 255, 0), ${theme.palette.background.paper} 70%) 0 100%, `
    // Shaddows
    + 'radial-gradient(farthest-side at 50% 0, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0)), '
    + 'radial-gradient(farthest-side at 50% 100%, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0)) 0 100%;',

  backgroundAttachment: 'local, local, scroll, scroll',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 40px, 100% 40px, 100% 14px, 100% 14px',
  overflowY: 'auto',
}));

/**
 * ScrollIndicatedDialogContent ~ Inject a style into the DialogContent component
 *                                to indicate there is scrollable content
*/
export function ScrollIndicatedDialogContent(props) {
  const { classes, className, ...otherProps } = props;
  const ourClassName = [className, classes.shadowScrollDialog].join(' ');

  return (
    <Root
      className={ourClassName}
      {...otherProps}
    />
  );
}

ScrollIndicatedDialogContent.propTypes = {
  classes: PropTypes.shape({
    shadowScrollDialog: PropTypes.string,
  }),
  className: PropTypes.string,
};

ScrollIndicatedDialogContent.defaultProps = {
  classes: {},
  className: '',
};
