import { Component, lazy, Suspense } from 'react';
import WindowCanvasNavigationControls from '../containers/WindowCanvasNavigationControls';

const OSDViewer = lazy(() => import('../containers/OpenSeadragonViewer'));

/**
 * Represents a WindowViewer in the mirador workspace. Responsible for mounting
 * OSD and Navigation
 */
export class WindowViewer extends Component {
  /** */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /** */
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  /**
   * Renders things
   */
  render() {
    const { hasError } = this.state;

    if (hasError) return null;

    return (
      <Suspense fallback={<div />}>
        <OSDViewer>
          <WindowCanvasNavigationControls />
        </OSDViewer>
      </Suspense>
    );
  }
}
