import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend/withPlugins';
import { WindowTopBarPluginArea } from '../components/WindowTopBarPluginArea';
import { withWindowContext } from '../contexts/WindowContext';

/**
 */
const styles = {};

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  withWindowContext,
  withPlugins('WindowTopBarPluginArea'),
);

export default enhance(WindowTopBarPluginArea);
