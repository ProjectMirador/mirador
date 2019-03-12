import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FilledInput from '@material-ui/core/FilledInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { CanvasThumbnail } from './CanvasThumbnail';
import ManifestoCanvas from '../lib/ManifestoCanvas';
import CompanionWindow from '../containers/CompanionWindow';
import { getIdAndLabelOfCanvases } from '../state/selectors';

/**
 * a panel showing the canvases for a given manifest
 */
export class WindowSideBarCanvasPanel extends Component {
  /** */
  constructor(props) {
    super(props);

    this.state = { variant: 'thumbnail' };
    this.handleVariantChange = this.handleVariantChange.bind(this);
  }

  /** */
  handleVariantChange(event) {
    this.setState({ variant: event.target.value });
  }

  /** */
  renderCompact(canvas, otherCanvas) {
    const {
      classes,
    } = this.props;

    return (
      <>
        <Typography
          className={classNames(classes.label)}
          variant="body2"
        >
          {canvas.label}
        </Typography>
      </>
    );
  }

  /** */
  renderThumbnail(canvas, otherCanvas) {
    const {
      classes, config,
    } = this.props;
    const { width, height } = config.canvasNavigation;
    const manifestoCanvas = new ManifestoCanvas(otherCanvas);

    return (
      <>
        <div style={{ minWidth: 50 }}>
          <CanvasThumbnail
            className={classNames(classes.clickable)}
            isValid={manifestoCanvas.hasValidDimensions}
            imageUrl={manifestoCanvas.thumbnail(width, height)}
            maxHeight={config.canvasNavigation.height}
            maxWidth={config.canvasNavigation.width}
            aspectRatio={manifestoCanvas.aspectRatio}
          />
        </div>
        <Typography
          className={classNames(classes.label)}
          variant="body2"
        >
          {canvas.label}
        </Typography>
      </>
    );
  }

  /** */
  renderToc(structures, defaultExpanded = false) {
    const {
      canvases, classes, setCanvas, windowId,
    } = this.props;

    return (
      structures.map(canvasOrRange => (
        <ExpansionPanel
          defaultExpanded={defaultExpanded}
          key={canvasOrRange.id}
          elevation={0}
          square
        >
          <ExpansionPanelSummary style={{ backgroundColor: '#eee' }}>
            {canvasOrRange.getLabel().map(label => label.value)[0]}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ flexDirection: 'column', paddingRight: 0, paddingLeft: 8 }}>
            {
              canvasOrRange.getRanges().length > 0
                && (
                  <List>
                    {
                      this.renderToc(canvasOrRange.getRanges())
                    }
                  </List>
                )
            }
            <List>
              {
                canvasOrRange.getCanvasIds().map((canvasId) => {
                  const canvas = canvases.find(e => e.id === canvasId);
                  if (!canvas) return <></>;

                  const onClick = () => { setCanvas(windowId, canvas.index); }; // eslint-disable-line require-jsdoc, max-len

                  return (
                    <ListItem
                      key={canvas.id}
                      alignItems="flex-start"
                      onClick={onClick}
                      button
                      component="li"
                      disableGutters
                    >
                      <Typography
                        className={classNames(classes.label)}
                        variant="body2"
                      >
                        {canvas.getLabel().map(label => label.value)[0]}
                      </Typography>
                    </ListItem>
                  );
                })
              }
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))
    );
  }

  /** */
  renderList() {
    const {
      canvases, structures, setCanvas, windowId,
    } = this.props;

    const { variant } = this.state;

    const canvasesIdAndLabel = getIdAndLabelOfCanvases(canvases);

    switch (variant) {
      case 'toc':
        return this.renderToc(structures, true);
      default:
        return (
          <List>
            {
              canvasesIdAndLabel.map((canvas, canvasIndex) => {
                const onClick = () => { setCanvas(windowId, canvasIndex); }; // eslint-disable-line require-jsdoc, max-len

                return (
                  <ListItem
                    key={canvas.id}
                    alignItems="flex-start"
                    onClick={onClick}
                    button
                    component="li"
                  >
                    {variant === 'compact' && this.renderCompact(canvas, canvases[canvasIndex])}
                    {variant === 'thumbnail' && this.renderThumbnail(canvas, canvases[canvasIndex])}
                  </ListItem>
                );
              })
            }
          </List>
        );
    }
  }

  /**
   * render
   */
  render() {
    const {
      t, windowId, id, structures,
    } = this.props;

    const { variant } = this.state;


    return (
      <CompanionWindow
        title={t('canvasIndex')}
        id={id}
        windowId={windowId}
        titleControls={(
          <FormControl variant="filled">
            <Select
              value={variant}
              onChange={this.handleVariantChange}
              name="variant"
              autoWidth
              variant="filled"
              input={<FilledInput name="variant" />}
            >
              <MenuItem value="compact">{ t('compactList') }</MenuItem>
              <MenuItem value="thumbnail">{ t('thumbnailList') }</MenuItem>
              { structures.length > 0 && <MenuItem value="toc">{ t('tocList') }</MenuItem> }
            </Select>
          </FormControl>
          )}
      >
        { this.renderList() }
      </CompanionWindow>
    );
  }
}

WindowSideBarCanvasPanel.propTypes = {
  canvases: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  structures: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  config: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  setCanvas: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

WindowSideBarCanvasPanel.defaultProps = {
  structures: [],
};
