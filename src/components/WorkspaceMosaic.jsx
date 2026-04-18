import { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { DndContext } from 'react-dnd';
import {
  Mosaic, MosaicWindow, getLeaves, createBalancedTreeFromLeaves, convertLegacyToNary
} from 'react-mosaic-component';
import difference from 'lodash/difference';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import MosaicRenderPreview from '../containers/MosaicRenderPreview';
import Window from '../containers/Window';
import MosaicLayout from '../lib/MosaicLayout';
import globalReactMosaicStyles from '../styles/react-mosaic-component';

const StyledMosaic = styled(Mosaic)({
  '& .mosaic-preview': {
    boxShadow: 'none',
  },
  '& .mosaic-tile': {
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .2), 0 2px 1px -1px rgba(0, 0, 0, .2)',
  },
  '& .mosaic-window': {
    boxShadow: 'none',
  },
  '& .mosaic-window-toolbar': {
    display: 'none !important',
  },
});

/** */
const RenderPreview = ({ windowId }) => (
  <div className="mosaic-preview" aria-hidden>
    <MosaicRenderPreview windowId={windowId} />
  </div>
);

RenderPreview.propTypes = {
  windowId: PropTypes.string.isRequired,
};

/** */
const ZeroStateView = () => (<div />);

/**
 * Used to regenerate a new layout when windows are added or removed
 */
const determineWorkspaceLayout = (currentLayout, windowIds, currentWindowPaths = {}) => {
  const leaveKeys = getLeaves(currentLayout);
  const mosaicLayout = new MosaicLayout(currentLayout);

  // Add new windows to layout
  const addedWindows = difference(windowIds, leaveKeys);
  if (addedWindows.length > 0) mosaicLayout.addWindows(addedWindows);

  const removedWindows = difference(leaveKeys, windowIds);

  // if we have paths for the removed windows, we can gracefully remove them and
  // preserve the existing layout for the remaining windows
  if (removedWindows.every(e => currentWindowPaths[e])) {
    mosaicLayout.removeWindows(removedWindows, currentWindowPaths);
  } else {
    // Windows were removed (perhaps in a different Workspace). We don't have a
    // way to reconfigure.. so we have to random generate

    return createBalancedTreeFromLeaves(windowIds);
  }

  return mosaicLayout.layout;
};

/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */
export function WorkspaceMosaic({
  layout = undefined, updateWorkspaceMosaicLayout, windowIds = [], workspaceId,
}) {

  const windowPaths = useRef({});
  const dndContext = useContext(DndContext);

  // Convert legacy layout format to new format if needed
  const normalizedLayout = layout ? convertLegacyToNary(layout) : layout;

  useEffect(() => {
    const leaveKeys = getLeaves(normalizedLayout);
    // Handle some trivial layout cases:
    // 1. No layout
    // 2. No windows
    // 3. Not enough windows to create a layout
    if (!normalizedLayout || windowIds.length === 0 || leaveKeys.length < 2) {
      updateWorkspaceMosaicLayout(createBalancedTreeFromLeaves(windowIds));

      return undefined;
    }

    // nothing was added or removed, and all the windows are accounted for in the layout
    if (windowIds.every(e => leaveKeys.includes(e)) && leaveKeys.every(e => windowIds.includes(e))) {
      return undefined;
    }

    const newLayout = determineWorkspaceLayout(normalizedLayout, windowIds, windowPaths.current);

    if (!isEqual(newLayout, normalizedLayout)) updateWorkspaceMosaicLayout(newLayout);

    return undefined;
  }, [normalizedLayout, windowIds, windowPaths, updateWorkspaceMosaicLayout]);

  const toolbarControls = [];

  /**
   * Render a tile (Window) in the Mosaic.
   */
  const tileRenderer = (id, path) => {
    if (!windowIds.includes(id)) return null;
    windowPaths.current[id] = path;

    return (
      <MosaicWindow
        toolbarControls={toolbarControls}
        path={path}
        windowId={id}
        renderPreview={RenderPreview}
      >
        <Window
          key={`${id}-${workspaceId}`}
          windowId={id}
        />
      </MosaicWindow>
    );
  };

  /**
   * Update the redux store when the Mosaic is changed.
   */
  const mosaicChange = (newLayout) => {
    updateWorkspaceMosaicLayout(newLayout);
  };

  return (
    <>
      <GlobalStyles styles={{ ...globalReactMosaicStyles }} />
      <StyledMosaic
        dragAndDropManager={dndContext.dragDropManager}
        renderTile={tileRenderer}
        initialValue={normalizedLayout || createBalancedTreeFromLeaves(windowIds)}
        onChange={mosaicChange}
        className={classNames('mirador-mosaic')}
        zeroStateView={<ZeroStateView />}
      />
    </>
  );
}

WorkspaceMosaic.propTypes = {
  layout: PropTypes.oneOfType(
    [PropTypes.object, PropTypes.string],
  ),
  updateWorkspaceMosaicLayout: PropTypes.func.isRequired,
  windowIds: PropTypes.arrayOf(PropTypes.string),
  workspaceId: PropTypes.string.isRequired,
};
