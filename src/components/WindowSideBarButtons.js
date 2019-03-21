import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/InfoSharp';
import AnnotationIcon from '@material-ui/icons/CommentSharp';
import CanvasIndexIcon from './icons/CanvasIndexIcon';

/**
 *
 */
export class WindowSideBarButtons extends Component {
  /** */
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  /** */
  handleChange(event, value) {
    const { addCompanionWindow } = this.props;

    addCompanionWindow(value);
  }

  /**
   * render
   *
   * @return {type}  description
   */
  render() {
    const {
      classes, hasAnnotations, sideBarPanel, t,
    } = this.props;

    return (
      <Tabs
        classes={{ flexContainer: classes.tabsFlexContainer, indicator: classes.tabsIndicator }}
        value={sideBarPanel === 'closed' ? false : sideBarPanel}
        onChange={this.handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-orientation="vertical"
      >
        <Tab
          classes={{ root: classes.tab, selected: classes.tabSelected }}
          aria-label={
            t('openInfoCompanionWindow')
          }
          icon={(
            <Tooltip title={t('openInfoCompanionWindow')}>
              <InfoIcon />
            </Tooltip>
          )}
          value="info"
        />
        <Tab
          classes={{ root: classes.tab, selected: classes.tabSelected }}
          aria-label={
            t('openCanvasNavigationCompanionWindow')
          }
          icon={(
            <Tooltip title={t('openCanvasNavigationCompanionWindow')}>
              <CanvasIndexIcon />
            </Tooltip>
          )}
          value="canvas_navigation"
        />
        <Tab
          classes={{ root: classes.tab, selected: classes.tabSelected }}
          aria-label={
            t('openAnnotationCompanionWindow')
          }
          icon={(
            <Tooltip title={t('openAnnotationCompanionWindow')}>
              <Badge color="error" invisible={!hasAnnotations} variant="dot">
                <AnnotationIcon />
              </Badge>
            </Tooltip>
          )}
          value="annotations"
        />
      </Tabs>
    );
  }
}

WindowSideBarButtons.propTypes = {
  addCompanionWindow: PropTypes.func.isRequired,
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  hasAnnotations: PropTypes.bool,
  sideBarPanel: PropTypes.string,
  t: PropTypes.func,
};

WindowSideBarButtons.defaultProps = {
  classes: {},
  hasAnnotations: false,
  sideBarPanel: 'closed',
  t: key => key,
};
