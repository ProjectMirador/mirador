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

  /**
   * render
   *
   * @return {type}  description
   */
  render() {
    const { hasAnnotations, toggleWindowSideBarPanel, t } = this.props;
    return (
      <>
        <IconButton
          aria-label={
            this.sideBarPanelCurrentlySelected('info')
              ? t('closeInfoCompanionWindow')
              : t('openInfoCompanionWindow')
          }
          onClick={() => (toggleWindowSideBarPanel('info'))}
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
          onClick={() => (toggleWindowSideBarPanel('canvas_navigation'))}
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
          onClick={() => (toggleWindowSideBarPanel('annotations'))}
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
  toggleWindowSideBarPanel: PropTypes.func,
  sideBarPanel: PropTypes.string,
  t: PropTypes.func,
};

WindowSideBarButtons.defaultProps = {
  hasAnnotations: false,
  toggleWindowSideBarPanel: () => {},
  sideBarPanel: 'closed',
  t: key => key,
};
