import {
  createRef, lazy, Suspense,
} from 'react';
import PluginProvider from '../extend/PluginProvider';
import AppProviders from '../containers/AppProviders';
import WorkspaceContext from '../contexts/WorkspaceContext';

const WorkspaceArea = lazy(() => import('../containers/WorkspaceArea'));
/* eslint-disable react/prop-types */

/**
 * This is the top level Mirador component.
 * @prop {Object} manifests
 */
export default function App({ dndManager, plugins = [] }) {
  const areaRef = createRef();

  return (
    <PluginProvider plugins={plugins}>
      <AppProviders dndManager={dndManager}>
        <WorkspaceContext.Provider value={areaRef}>
          <Suspense fallback={<div />}>
            <WorkspaceArea areaRef={areaRef} />
          </Suspense>
        </WorkspaceContext.Provider>
      </AppProviders>
    </PluginProvider>
  );
}
