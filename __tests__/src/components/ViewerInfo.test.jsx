import { render, screen } from '@tests/utils/test-utils';
import { buildManifestV2, buildManifestV3 } from '@tests/utils/build-manifest';
import { buildCanvasesV2, buildCanvasesV3 } from '@tests/utils/build-canvases';
import { buildMiradorState } from '@tests/utils/build-state';
import ViewerInfo from '@src/containers/ViewerInfo';

const v2Manifest = () =>
  buildManifestV2({
    canvases: buildCanvasesV2({ count: 8, canvasOverrides: { 3: { label: 'testLabel' } } }),
  });

const v3Manifest = () =>
  buildManifestV3({
    items: buildCanvasesV3({ count: 8, canvasOverrides: { 3: { label: 'testLabel' } } }),
  });

describe.each([
  ['Presentation 2', v2Manifest],
  ['Presentation 3', v3Manifest],
])('ViewerInfo (%s)', (_label, buildManifest) => {
  const renderViewerInfo = (windowOverrides = {}) => {
    const preloadedState = buildMiradorState({
      windows: [{ manifest: buildManifest(), ...windowOverrides }],
    });
    const [windowId] = preloadedState.workspace.windowIds;

    return render(<ViewerInfo windowId={windowId} />, { preloadedState });
  };

  it('renders the current canvas position and label', () => {
    renderViewerInfo({ canvasId: 'canvas-3' });

    expect(screen.getByText('3 of 8', { selector: 'span' })).toBeInTheDocument();
    expect(screen.getByText(/testLabel/, { selector: 'span' })).toBeInTheDocument();
  });

  it('defaults to the first canvas when no canvasId is set', () => {
    renderViewerInfo();

    expect(screen.getByText('1 of 8', { selector: 'span' })).toBeInTheDocument();
    expect(screen.getByText(/Canvas 1/, { selector: 'span' })).toBeInTheDocument();
  });
});
