import PropTypes from 'prop-types';

export const windowShape = {
  id: PropTypes.string,
  canvasIndex: PropTypes.number,
  manifestId: PropTypes.string,
  viewer: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    zoom: PropTypes.number,
  }),
};

export const canvasShape = {
  id: PropTypes.string,
  aspectRatio: PropTypes.number,
};

export const manifestShape = {
  id: PropTypes.string,
  manifestation: PropTypes.object,
};

export const workspaceShape = {
  fullscreen: PropTypes.bool,
};

export const infoResponsesShape = {
  isFetching: PropTypes.bool,
  json: PropTypes.object,
};
