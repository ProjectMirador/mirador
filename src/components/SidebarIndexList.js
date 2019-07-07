import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { ScrollTo } from './ScrollTo';
import ManifestoCanvas from '../lib/ManifestoCanvas';
import SidebarIndexCompact from '../containers/SidebarIndexCompact';
import SidebarIndexThumbnail from '../containers/SidebarIndexThumbnail';

/** */
export class SidebarIndexList extends Component {
  /** @private */
  getIdAndLabelOfCanvases() {
    const { canvases } = this.props;

    return canvases.map((canvas, index) => ({
      id: canvas.id,
      label: new ManifestoCanvas(canvas).getLabel(),
    }));
  }

  /** */
  render() {
    const {
      canvases,
      classes,
      containerRef,
      selectedCanvases,
      setCanvas,
      variant,
      windowId,
    } = this.props;

    const canvasesIdAndLabel = this.getIdAndLabelOfCanvases(canvases);

    return (
      <List>
        {
          canvasesIdAndLabel.map((canvas, canvasIndex) => {
            const onClick = () => { setCanvas(windowId, canvas.id); }; // eslint-disable-line require-jsdoc, max-len

            return (
              <ScrollTo
                containerRef={containerRef}
                key={`${canvas.id}-${variant}`}
                offsetTop={96} // offset for the height of the form above
                scrollTo={!!selectedCanvases.find(c => c.id === canvas.id)}
              >
                <ListItem
                  key={canvas.id}
                  className={classes.listItem}
                  alignItems="flex-start"
                  onClick={onClick}
                  button
                  component="li"
                  selected={!!selectedCanvases.find(c => c.id === canvas.id)}
                >
                  {variant === 'compact' && <SidebarIndexCompact canvas={canvas} />}
                  {variant === 'thumbnail' && <SidebarIndexThumbnail canvas={canvas} otherCanvas={canvases[canvasIndex]} />}
                </ListItem>
              </ScrollTo>
            );
          })
        }
      </List>
    );
  }
}

SidebarIndexList.propTypes = {
  canvases: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  containerRef: PropTypes.oneOf([PropTypes.func, PropTypes.object]).isRequired,
  selectedCanvases: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
  setCanvas: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['compact', 'thumbnail']),
  windowId: PropTypes.string.isRequired,
};

SidebarIndexList.defaultProps = {
  selectedCanvases: [],
  variant: 'thumbnail',
};
