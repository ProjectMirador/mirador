import { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { v4 as uuid } from 'uuid';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import DragHandleIcon from '@mui/icons-material/DragHandleSharp';
import MoveToTopIcon from '@mui/icons-material/VerticalAlignTopSharp';
import VisibilityIcon from '@mui/icons-material/VisibilitySharp';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffSharp';
import OpacityIcon from '@mui/icons-material/OpacitySharp';
import Typography from '@mui/material/Typography';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import IIIFThumbnail from '../containers/IIIFThumbnail';

const StyledDragHandle = styled('div')(({ theme }) => ({
  alignItems: 'center',
  borderRight: `0.5px solid ${theme.palette.divider}`,
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  marginBottom: -1 * theme.spacing(2) + 0.5,
  marginRight: theme.spacing(1),
  marginTop: -1 * theme.spacing(2),
  maxWidth: theme.spacing(3),
  width: theme.spacing(3),
}));

/** */
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/** */
export class CanvasLayers extends Component {
  /** */
  static getUseableLabel(resource, index) {
    return (resource
      && resource.getLabel
      && resource.getLabel().length > 0)
      ? resource.getLabel().getValue()
      : String(index + 1);
  }

  /** */
  constructor(props) {
    super(props);
    this.droppableId = uuid();
    this.onDragEnd = this.onDragEnd.bind(this);
    this.handleOpacityChange = this.handleOpacityChange.bind(this);
    this.setLayerVisibility = this.setLayerVisibility.bind(this);
    this.moveToTop = this.moveToTop.bind(this);
  }

  /** */
  handleOpacityChange(layerId, value) {
    const {
      canvasId, updateLayers, windowId,
    } = this.props;

    const payload = {
      [layerId]: { opacity: value / 100.0 },
    };

    updateLayers(windowId, canvasId, payload);
  }

  /** */
  onDragEnd(result) {
    const {
      canvasId, layers, updateLayers, windowId,
    } = this.props;
    if (!result.destination) return;
    if (result.destination.droppableId !== this.droppableId) return;
    if (result.source.droppableId !== this.droppableId) return;

    const sortedLayers = reorder(
      layers.map(l => l.id),
      result.source.index,
      result.destination.index,
    );

    const payload = layers.reduce((acc, layer) => {
      acc[layer.id] = { index: sortedLayers.indexOf(layer.id) };
      return acc;
    }, {});

    updateLayers(windowId, canvasId, payload);
  }

  /** */
  setLayerVisibility(layerId, value) {
    const {
      canvasId, updateLayers, windowId,
    } = this.props;

    const payload = {
      [layerId]: { visibility: value },
    };

    updateLayers(windowId, canvasId, payload);
  }

  /** */
  moveToTop(layerId) {
    const {
      canvasId, layers, updateLayers, windowId,
    } = this.props;

    const sortedLayers = reorder(layers.map(l => l.id), layers.findIndex(l => l.id === layerId), 0);

    const payload = layers.reduce((acc, layer) => {
      acc[layer.id] = { index: sortedLayers.indexOf(layer.id) };
      return acc;
    }, {});

    updateLayers(windowId, canvasId, payload);
  }

  /** @private */
  renderLayer(resource, index) {
    const {
      layerMetadata,
      t,
    } = this.props;

    const { width, height } = { height: undefined, width: 50 };

    const layer = {
      opacity: 1,
      visibility: true,
      ...(layerMetadata || {})[resource.id],
    };

    return (
      <div style={{ flex: 1 }}>
        <div style={{ alignItems: 'flex-start', display: 'flex' }}>
          <IIIFThumbnail
            maxHeight={height}
            maxWidth={width}
            resource={resource}
            imageStyle
          />
          <Typography
            sx={{
              paddingLeft: 1,
            }}
            component="div"
            variant="body1"
          >
            {CanvasLayers.getUseableLabel(resource, index)}
            <div>
              <MiradorMenuButton aria-label={t(layer.visibility ? 'layer_hide' : 'layer_show')} edge="start" size="small" onClick={() => { this.setLayerVisibility(resource.id, !layer.visibility); }}>
                { layer.visibility ? <VisibilityIcon /> : <VisibilityOffIcon /> }
              </MiradorMenuButton>
              { layer.index !== 0 && (
                <MiradorMenuButton aria-label={t('layer_moveToTop')} size="small" onClick={() => { this.moveToTop(resource.id); }}>
                  <MoveToTopIcon />
                </MiradorMenuButton>
              )}
            </div>
          </Typography>
        </div>
        <div style={{ alignItems: 'center', display: 'flex' }}>
          <Tooltip title={t('layer_opacity')}>
            <OpacityIcon sx={{ marginRight: 0.5 }} color={layer.visibility ? 'inherit' : 'disabled'} fontSize="small" />
          </Tooltip>
          <Input
            sx={{
              'MuiInput-input': {
                '&::-webkit-outer-spin-button,&::-webkit-inner-spin-button': {
                  margin: 0,
                  WebkitAppearance: 'none',
                },
                MozAppearance: 'textfield',
                textAlign: 'right',
                typography: 'caption',
                width: '3ch',
              },
            }}
            disabled={!layer.visibility}
            value={Math.round(layer.opacity * 100)}
            type="number"
            min={0}
            max={100}
            onChange={e => this.handleOpacityChange(resource.id, e.target.value)}
            endAdornment={<InputAdornment disableTypography position="end"><Typography variant="caption">%</Typography></InputAdornment>}
            inputProps={{
              'aria-label': t('layer_opacity'),
            }}
          />
          <Slider
            sx={{
              marginLeft: 2,
              marginRight: 2,
              maxWidth: 150,
            }}
            disabled={!layer.visibility}
            value={layer.opacity * 100}
            onChange={(e, value) => this.handleOpacityChange(resource.id, value)}
          />
        </div>
      </div>
    );
  }

  /** @private */
  renderDraggableLayer(resource, index) {
    const {
      t,
    } = this.props;

    return (
      <Draggable key={resource.id} draggableId={resource.id} index={index}>
        {(provided, snapshot) => (
          <ListItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            component="li"
            sx={{
              alignItems: 'stretch',
              borderBottom: '0.5px solid',
              borderBottomColor: 'divider',
              cursor: 'pointer',
              paddingBottom: 2,
              paddingRight: 2,
              paddingTop: 2,
              ...(snapshot.isDragging && {
                backgroundColor: 'action.hover',
              }),
            }}
            disableGutters
            key={resource.id}
          >
            <StyledDragHandle
              {...provided.dragHandleProps}
              sx={{
                '&:hover': {
                  backgroundColor: snapshot.isDragging ? 'action.selected' : 'action.hover',
                },
                backgroundColor: snapshot.isDragging ? 'action.selected' : 'shades.light',
              }}
            >
              <Tooltip title={t('layer_move')}>
                <DragHandleIcon />
              </Tooltip>
            </StyledDragHandle>
            {this.renderLayer(resource, index)}
          </ListItem>
        )}
      </Draggable>
    );
  }

  /** */
  render() {
    const {
      index,
      label,
      layers,
      t,
      totalSize,
    } = this.props;

    return (
      <>
        { totalSize > 1 && (
          <Typography
            sx={{
              paddingLeft: 1,
              paddingRight: 1,
              paddingTop: 2,
            }}
            variant="overline"
          >
            {t('annotationCanvasLabel', { context: `${index + 1}/${totalSize}`, label })}
          </Typography>
        )}
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId={this.droppableId}>
            {(provided, snapshot) => (
              <List
                sx={{
                  paddingTop: 0,
                }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {
                  layers && layers.map((r, i) => (
                    this.renderDraggableLayer(r, i)
                  ))
                }
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </>
    );
  }
}

CanvasLayers.propTypes = {
  canvasId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  layerMetadata: PropTypes.objectOf(PropTypes.shape({
    opacity: PropTypes.number,
  })),
  layers: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
  t: PropTypes.func.isRequired,
  totalSize: PropTypes.number.isRequired,
  updateLayers: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

CanvasLayers.defaultProps = {
  layerMetadata: undefined,
};
