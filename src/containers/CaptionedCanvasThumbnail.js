import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { CaptionedCanvasThumbnail } from '../components/CaptionedCanvasThumbnail';

/**
 * Styles for withStyles HOC
 */
const styles = theme => ({
  canvasThumbLabel: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    bottom: '5px',
    left: '0px',
    overflow: 'hidden',
    position: 'absolute',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  container: {
    display: 'inline-block',
    height: 'inherit',
    position: 'relative',
  },
  root: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  title: {
    color: '#ffffff',
  },
});

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  withPlugins('CaptionedCanvasThumbnail'),
);

export default enhance(CaptionedCanvasThumbnail);
