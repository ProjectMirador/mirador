import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { IIIFThumbnail } from '../components/IIIFThumbnail';
/**
 * Styles for withStyles HOC
 */

var styles = function styles(theme) {
  return {
    caption: {
      lineHeight: '1.5em',
      wordBreak: 'break-word'
    },
    image: {},
    insideCaption: {
      color: '#ffffff',
      lineClamp: '1',
      whiteSpace: 'nowrap'
    },
    insideLabel: {
      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
      bottom: '5px',
      boxSizing: 'border-box',
      left: '0px',
      padding: '4px',
      position: 'absolute',
      width: '100%'
    },
    insideRoot: {
      display: 'inline-block',
      height: 'inherit',
      position: 'relative'
    },
    label: {
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    outsideCaption: {
      boxOrient: 'vertical',
      display: '-webkit-box',
      lineClamp: '2',
      maxHeight: '3em'
    },
    outsideLabel: {},
    outsideRoot: {},
    root: {}
  };
};

var enhance = compose(withStyles(styles), withTranslation(), withPlugins('IIIFThumbnail'));
export default enhance(IIIFThumbnail);