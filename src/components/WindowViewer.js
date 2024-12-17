import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import WindowCanvasNavigationControls from '../containers/WindowCanvasNavigationControls';

const OSDViewer = lazy(() => import('../containers/OpenSeadragonViewer'));

/**
 * Represents a WindowViewer in the mirador workspace. Responsible for mounting
 * OSD and Navigation
 */
export function WindowViewer() {
  return (
    <ErrorBoundary fallback={null}>
      <Suspense fallback={<div />}>
        <OSDViewer>
          <WindowCanvasNavigationControls />
        </OSDViewer>
      </Suspense>
    </ErrorBoundary>
  );
}
