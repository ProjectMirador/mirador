import ns from '../config/css-ns';
import { PluginHook } from './PluginHook';

/** invisible area where background plugins can add to */
export const BackgroundPluginArea = ({ ...props }) => (
  <div className={ns('background-plugin-area')} style={{ display: 'none' }}>
    <PluginHook targetName="BackgroundPluginArea" {...props} />
  </div>
);
