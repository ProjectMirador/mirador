import { withStyles } from '@material-ui/core/styles';
import { ScrollIndicatedDialogContent } from '../components/ScrollIndicatedDialogContent';

/**
 * Styles for the withStyles HOC
 */
const styles = theme => ({
  shadowScrollDialog: {
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
  },
});

export default withStyles(styles)(ScrollIndicatedDialogContent);
