import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import RootRef from '@material-ui/core/RootRef';
import ItemListIcon from '@material-ui/icons/ReorderSharp';
import TocIcon from '@material-ui/icons/SortSharp';
import ThumbnailListIcon from '@material-ui/icons/ViewListSharp';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardSharp';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CompanionWindow from '../containers/CompanionWindow';
import SidebarIndexList from '../containers/SidebarIndexList';
import SidebarIndexTableOfContents from '../containers/SidebarIndexTableOfContents';

/**
 * a panel showing the canvases for a given manifest
 */
export class WindowSideBarCanvasPanel extends Component {
  /** */
  constructor(props) {
    super(props);
    this.handleSequenceChange = this.handleSequenceChange.bind(this);
    this.handleVariantChange = this.handleVariantChange.bind(this);

    this.state = {
      sequenceSelectionOpened: false,
    };

    this.containerRef = React.createRef();
  }

  /** */
  static getUseableLabel(resource, index) {
    return (resource
      && resource.getLabel
      && resource.getLabel().length > 0)
      ? resource.getLabel().getValue()
      : resource.id;
  }

  /** @private */
  async handleSequenceChange(event) {
    const { setCanvas, updateSequence } = this.props;
    await updateSequence(event.target.value);

    const { windowId, canvases } = this.props;
    const firstCanvasId = canvases[0].id;
    setCanvas(windowId, firstCanvasId);

    this.setState({ sequenceSelectionOpened: false });
  }

  /** @private */
  handleVariantChange(event, value) {
    const { updateVariant } = this.props;

    updateVariant(value);
  }

  /**
   * render
   */
  render() {
    const {
      canvases,
      classes,
      collection,
      id,
      showMultipart,
      sequenceId,
      sequences,
      t,
      toggleDraggingEnabled,
      variant,
      showToc,
      windowId,
    } = this.props;

    const { sequenceSelectionOpened } = this.state;
    let listComponent;

    if (variant === 'tableOfContents') {
      listComponent = (
        <SidebarIndexTableOfContents
          id={id}
          containerRef={this.containerRef}
          windowId={windowId}
        />
      );
    } else {
      listComponent = (
        <SidebarIndexList
          id={id}
          containerRef={this.containerRef}
          windowId={windowId}
        />
      );
    }

    return (
      <RootRef rootRef={this.containerRef}>
        <CompanionWindow
          title={t('canvasIndex')}
          id={id}
          windowId={windowId}
          titleControls={(
            <>
              {
                sequences && sequences.length > 1 && (
                  <FormControl>
                    <Select
                      MenuProps={{
                        anchorOrigin: {
                          horizontal: 'left',
                          vertical: 'bottom',
                        },
                        getContentAnchorEl: null,
                      }}
                      displayEmpty
                      value={sequenceId}
                      onChange={this.handleSequenceChange}
                      name="sequenceId"
                      open={sequenceSelectionOpened}
                      onOpen={(e) => {
                        toggleDraggingEnabled();
                        this.setState({ sequenceSelectionOpened: true });
                      }}
                      onClose={(e) => {
                        toggleDraggingEnabled();
                        this.setState({ sequenceSelectionOpened: false });
                      }}
                      classes={{ select: classes.select }}
                      className={classes.selectEmpty}
                    >
                      { sequences.map((s, i) => <MenuItem value={s.id} key={s.id}><Typography variant="body2">{ WindowSideBarCanvasPanel.getUseableLabel(s, i) }</Typography></MenuItem>) }
                    </Select>
                  </FormControl>
                )
              }
              <div className={classes.break} />
              <Tabs
                value={variant}
                onChange={this.handleVariantChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
              >
                {showToc && (
                  <Tooltip title={t('tableOfContentsList')} value="tableOfContents"><Tab className={classes.variantTab} value="tableOfContents" aria-label={t('tableOfContentsList')} aria-controls={`tab-panel-${id}`} icon={<TocIcon style={{ transform: 'scale(-1, 1)' }} />} /></Tooltip>
                )}
                <Tooltip title={t('itemList')} value="item"><Tab className={classes.variantTab} value="item" aria-label={t('itemList')} aria-controls={`tab-panel-${id}`} icon={<ItemListIcon />} /></Tooltip>
                <Tooltip title={t('thumbnailList')} value="thumbnail"><Tab className={classes.variantTab} value="thumbnail" aria-label={t('thumbnailList')} aria-controls={`tab-panel-${id}`} icon={<ThumbnailListIcon />} /></Tooltip>
              </Tabs>
            </>
          )}
        >
          <div id={`tab-panel-${id}`}>
            { collection && (
              <Button
                fullWidth
                onClick={showMultipart}
                endIcon={<ArrowForwardIcon />}
              >
                <Typography className={classes.collectionNavigationButton}>
                  {WindowSideBarCanvasPanel.getUseableLabel(collection)}
                </Typography>
              </Button>
            )}
            {listComponent}
          </div>
        </CompanionWindow>
      </RootRef>
    );
  }
}

WindowSideBarCanvasPanel.propTypes = {
  canvases: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  collection: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  id: PropTypes.string.isRequired,
  sequenceId: PropTypes.string,
  sequences: PropTypes.arrayOf(PropTypes.object),
  setCanvas: PropTypes.func.isRequired,
  showMultipart: PropTypes.func.isRequired,
  showToc: PropTypes.bool,
  t: PropTypes.func.isRequired,
  toggleDraggingEnabled: PropTypes.func.isRequired,
  updateSequence: PropTypes.func.isRequired,
  updateVariant: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['item', 'thumbnail', 'tableOfContents']).isRequired,
  windowId: PropTypes.string.isRequired,
};

WindowSideBarCanvasPanel.defaultProps = {
  canvases: [],
  collection: null,
  sequenceId: null,
  sequences: [],
  showToc: false,
};
