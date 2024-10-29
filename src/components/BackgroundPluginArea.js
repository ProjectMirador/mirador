import ns from '../config/css-ns';
import { PluginHook } from './PluginHook';

const BackgroundPluginAreaDefaultProps = {
  PluginComponents: [],
};

/** invisible area where background plugins can add to */
export const BackgroundPluginArea = props => (
  <div className={ns('background-plugin-area')} style={{ display: 'none' }}>
    <PluginHook {...BackgroundPluginAreaDefaultProps} {...props} />
  </div>
);
