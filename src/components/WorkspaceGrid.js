import { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { DndContext } from 'react-dnd';
import { Grid, GridContext, GridDispatchContext } from 'mirador-mosaic';
import Window from '../containers/Window';

/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */
const WorkspaceGrid = ({ gridTemplate, windowIds }) => {
  const { dragDropManager } = useContext(DndContext);
  const dispatch = useDispatch();

  const wrappedDispatch = useCallback((action) => {
    dispatch({ ...action, type: `mirador/grid/${action.type}` });
  }, [dispatch]);

  return (
    <div style={{ height: '100%', position: 'relative', width: '100%' }}>
      <GridContext.Provider value={gridTemplate}>
        <GridDispatchContext.Provider value={wrappedDispatch}>
          <Grid dragAndDropManager={dragDropManager}>
            {
              windowIds.map(windowId => (
                <Window
                  id={windowId}
                  key={windowId}
                  windowId={windowId}
                />
              ))
            }
          </Grid>
        </GridDispatchContext.Provider>
      </GridContext.Provider>
    </div>
  );
};

WorkspaceGrid.propTypes = {
  gridTemplate: PropTypes.shape({
    areas: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    columns: PropTypes.arrayOf(PropTypes.number),
    rows: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  windowIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default WorkspaceGrid;
