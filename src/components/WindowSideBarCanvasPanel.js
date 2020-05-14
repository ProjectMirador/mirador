import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import RootRef from '@material-ui/core/RootRef';
import Select from '@material-ui/core/Select';
import CompanionWindow from '../containers/CompanionWindow';
import SidebarIndexList from '../containers/SidebarIndexList';
import SidebarIndexTableOfContents from '../containers/SidebarIndexTableOfContents';

/**
 * a panel showing the canvases for a given manifest
 */
export class WindowSideBarCanvasPanel extends Component {
  /** */
  static getUseableLabel(resource, index) {
    return (resource
      && resource.getLabel
      && resource.getLabel().length > 0)
      ? resource.getLabel().map(label => label.value)[0]
      : String(index + 1);
  }

  /** */
  constructor(props) {
    super(props);
    this.handleSequenceChange = this.handleSequenceChange.bind(this);
    this.handleVariantChange = this.handleVariantChange.bind(this);

    this.state = {
      sequenceSelectionOpened: false,
      variantSelectionOpened: false,
    };

    this.containerRef = React.createRef();
  }

  /** @private */
  handleSequenceChange(event) {
    const { updateSequence } = this.props;

    updateSequence(event.target.value);

    this.setState({ sequenceSelectionOpened: false });
  }

  /** @private */
  handleVariantChange(event) {
    const { updateVariant } = this.props;

    updateVariant(event.target.value);

    this.setState({ variantSelectionOpened: false });
  }

  /**
   * render
   */
  render() {
    const {
      classes,
      id,
      sequenceId,
      sequences,
      t,
      toggleDraggingEnabled,
      variant,
      windowId,
    } = this.props;

    const { sequenceSelectionOpened, variantSelectionOpened } = this.state;
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
                )}
              <div className={classes.break} />
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
                  value={variant}
                  onChange={this.handleVariantChange}
                  name="variant"
                  open={variantSelectionOpened}
                  onOpen={(e) => {
                    toggleDraggingEnabled();
                    this.setState({ variantSelectionOpened: true });
                  }}
                  onClose={(e) => {
                    toggleDraggingEnabled();
                    this.setState({ variantSelectionOpened: false });
                  }}
                  classes={{ select: classes.select }}
                  className={classes.selectEmpty}
                >
                  <MenuItem value="tableOfContents"><Typography variant="body2">{ t('tableOfContentsList') }</Typography></MenuItem>
                  <MenuItem value="item"><Typography variant="body2">{ t('itemList') }</Typography></MenuItem>
                  <MenuItem value="thumbnail"><Typography variant="body2">{ t('thumbnailList') }</Typography></MenuItem>
                </Select>
              </FormControl>
            </>
          )}
        >
          {listComponent}
        </CompanionWindow>
      </RootRef>
    );
  }
}

WindowSideBarCanvasPanel.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  sequenceId: PropTypes.string,
  sequences: PropTypes.arrayOf(PropTypes.object),
  t: PropTypes.func.isRequired,
  toggleDraggingEnabled: PropTypes.func.isRequired,
  updateSequence: PropTypes.func.isRequired,
  updateVariant: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['item', 'thumbnail', 'tableOfContents']).isRequired,
  windowId: PropTypes.string.isRequired,
};

WindowSideBarCanvasPanel.defaultProps = {
  sequenceId: null,
  sequences: [],
};
