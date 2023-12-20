import { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
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

    this.containerRef = createRef();
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
  handleSequenceChange(event) {
    const { updateSequence } = this.props;

    updateSequence(event.target.value);
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
      classes,
      collection,
      id,
      showMultipart,
      sequenceId,
      sequences,
      t,
      variant,
      showToc,
    } = this.props;

    let listComponent;

    if (variant === 'tableOfContents') {
      listComponent = (
        <SidebarIndexTableOfContents
          id={id}
          containerRef={this.containerRef}
        />
      );
    } else {
      listComponent = (
        <SidebarIndexList
          id={id}
          containerRef={this.containerRef}
        />
      );
    }

    return (
      <CompanionWindow
        title={t('canvasIndex')}
        id={id}
        ref={this.containerRef}
        otherRef={this.containerRef}
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
                    classes={{ select: classes.select }}
                    className={classes.selectEmpty}
                    data-testid="sequence-select"
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
    );
  }
}

WindowSideBarCanvasPanel.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  collection: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  id: PropTypes.string.isRequired,
  sequenceId: PropTypes.string,
  sequences: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  showMultipart: PropTypes.func.isRequired,
  showToc: PropTypes.bool,
  t: PropTypes.func.isRequired,
  updateSequence: PropTypes.func.isRequired,
  updateVariant: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['item', 'thumbnail', 'tableOfContents']).isRequired,
};

WindowSideBarCanvasPanel.defaultProps = {
  collection: null,
  sequenceId: null,
  sequences: [],
  showToc: false,
};
