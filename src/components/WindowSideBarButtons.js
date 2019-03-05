import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/InfoSharp';
import AnnotationIcon from '@material-ui/icons/CommentSharp';
import CanvasIndexIcon from './icons/CanvasIndexIcon';

/**
 *
 */
export class WindowSideBarButtons extends Component {
  /**
   * sideBarPanelCurrentlySelected - return if the given sideBarPanel is currently selected
   * @return Boolean
   */
  sideBarPanelCurrentlySelected(panelType) {
    const { sideBarPanel } = this.props;

    return sideBarPanel === panelType;
  }

  /** */
  toggleCompanionWindow(panelType) {
    const {
      addCompanionWindow, closeCompanionWindow, sideBarPanelId,
    } = this.props;

    if (this.sideBarPanelCurrentlySelected(panelType)) {
      closeCompanionWindow(sideBarPanelId);
    } else {
      addCompanionWindow(panelType);
    }
  }

  /**
   * render
   *
   * @return {type}  description
   */
  render() {
    const { hasAnnotations, t } = this.props;
    return (
      <>
        <IconButton
          aria-label={
            this.sideBarPanelCurrentlySelected('info')
              ? t('closeInfoCompanionWindow')
              : t('openInfoCompanionWindow')
          }
          onClick={() => (this.toggleCompanionWindow('info'))}
        >
          <InfoIcon
            color={this.sideBarPanelCurrentlySelected('info') ? 'secondary' : 'inherit'}
          />
        </IconButton>
        <IconButton
          aria-label={
            this.sideBarPanelCurrentlySelected('canvas_navigation')
              ? t('closeCanvasNavigationCompanionWindow')
              : t('openCanvasNavigationCompanionWindow')
          }
          onClick={() => (this.toggleCompanionWindow('canvas_navigation'))}
        >
          <CanvasIndexIcon
            color={this.sideBarPanelCurrentlySelected('canvas_navigation') ? 'secondary' : 'inherit'}
          />
        </IconButton>

        <IconButton
          aria-label={
            this.sideBarPanelCurrentlySelected('annotations')
              ? t('closeAnnotationCompanionWindow')
              : t('openAnnotationCompanionWindow')
          }
          onClick={() => (this.toggleCompanionWindow('annotations'))}
        >
          <Badge color="error" invisible={!hasAnnotations} variant="dot">
            <AnnotationIcon
              color={this.sideBarPanelCurrentlySelected('annotations') ? 'secondary' : 'inherit'}
            />
          </Badge>
        </IconButton>
      </>
    );
  }
}

WindowSideBarButtons.propTypes = {
  hasAnnotations: PropTypes.bool,
  addCompanionWindow: PropTypes.func.isRequired,
  closeCompanionWindow: PropTypes.func.isRequired,
  sideBarPanel: PropTypes.string,
  sideBarPanelId: PropTypes.string,
  t: PropTypes.func,
};

WindowSideBarButtons.defaultProps = {
  hasAnnotations: false,
  sideBarPanel: 'closed',
  sideBarPanelId: null,
  t: key => key,
};
