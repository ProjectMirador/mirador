import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

/**
 * TableOfContentsTree
 */
export class TableOfContentsTree extends Component {
  /**
   * generate a single toc section
   * @return
   */
  tocSection(range) {
    const {
      setCanvas,
      toggleRange,
      windowId,
      rangeStatuses,
      selectedRanges,
      manifesto,
    } = this.props;

    const leaf = range.items.length === 0;
    const { label } = range.__jsonld; // eslint-disable-line no-underscore-dangle

    const isOpen = rangeStatuses
                && rangeStatuses[range.id]
                && rangeStatuses[range.id].expanded;
    const isSelected = selectedRanges.includes(range.id);

    const open = isOpen || isSelected ? 'open' : '';
    const selected = isSelected ? 'selected' : '';

    return (
      <div className={`mirador-toc-item ${selected}`} key={range.id}>
        <Typography
          variant="subtitle2"
          onClick={(e) => {
            if (leaf) {
              setCanvas(
                windowId,
                manifesto
                  .getSequences()[0]
                  .getCanvasIndexById(range.getCanvasIds()[0]),
              );
              return;
            }
            toggleRange(windowId, range.id);
          }}
          className={`mirador-toc-heading ${open} ${leaf ? 'leaf' : ''}`}
        >
          { label }
        </Typography>
        {
          !leaf ? (
            <div className={`mirador-toc-section ${open}`}>
              { range.items.map(item => this.tocSection(item)) }
            </div>
          ) : ''
        }
      </div>
    );
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      manifestStructures,
      rangeStatuses,
      windowId,
      setCanvas,
      toggleRange,
      classes,
      t,
    } = this.props;
    const hasStructures = manifestStructures[0] !== null;
    const label = hasStructures ? manifestStructures[0].__jsonld.label : ''; // eslint-disable-line no-underscore-dangle

    return (
      <div className={classes.section}>
        <Typography
          className={classes.label}
          variant="h4"
        >
          { label }
        </Typography>
        { manifestStructures[0] ? manifestStructures[0].items.map(item => (
          this.tocSection(item, setCanvas, toggleRange, windowId, rangeStatuses)
        )) : '' }
      </div>
    );
  }
}

TableOfContentsTree.propTypes = {
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  manifesto: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  manifestStructures: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  rangeStatuses: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  selectedRanges: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  setCanvas: PropTypes.func.isRequired,
  t: PropTypes.func,
  toggleRange: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

TableOfContentsTree.defaultProps = {
  classes: {},
  manifestStructures: [],
  rangeStatuses: {},
  t: key => key,
};
