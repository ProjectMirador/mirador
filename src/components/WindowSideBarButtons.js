import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/InfoSharp';
import AnnotationIcon from '@material-ui/icons/CommentSharp';
import AttributionIcon from '@material-ui/icons/CopyrightSharp';
import LayersIcon from '@material-ui/icons/LayersSharp';
import SearchIcon from '@material-ui/icons/SearchSharp';
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

  /**
   * @param {object} event the change event
   * @param {string} value the tab's value
  */
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
      classes,
      hasAnnotations,
      hasAnyAnnotations,
      hasAnyLayers,
      hasCurrentLayers,
      hasSearchResults,
      hasSearchService,
      panels,
      PluginComponents,
      sideBarPanel,
      t,
    } = this.props;

    /** */
    const TabButton = props => (
      <Tooltip title={t('openCompanionWindow', { context: props.value })}>
        <Tab
          {...props}
          classes={{ root: classes.tab, selected: classes.tabSelected }}
          aria-label={
            t('openCompanionWindow', { context: props.value })
          }
          disableRipple
          onKeyUp={this.handleKeyUp}
        />
      </Tooltip>
    );

    return (
      <Tabs
        classes={{ flexContainer: classes.tabsFlexContainer, indicator: classes.tabsIndicator }}
        value={sideBarPanel === 'closed' ? false : sideBarPanel}
        onChange={this.handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        orientation="vertical"
        aria-orientation="vertical"
        aria-label={t('sidebarPanelsNavigation')}
      >
        { panels.info && (
          <TabButton
            value="info"
            icon={(<InfoIcon />)}
          />
        )}
        { panels.attribution && (
          <TabButton
            value="attribution"
            icon={(<AttributionIcon />)}
          />
        )}
        { panels.canvas && (
          <TabButton
            value="canvas"
            icon={(<CanvasIndexIcon />)}
          />
        )}
        {panels.annotations && (hasAnnotations || hasAnyAnnotations) && (
          <TabButton
            value="annotations"
            icon={(
              <Badge classes={{ badge: classes.badge }} invisible={!hasAnnotations} variant="dot">
                <AnnotationIcon />
              </Badge>
            )}
          />
        )}
        {panels.search && hasSearchService && (
          <TabButton
            value="search"
            icon={(
              <Badge classes={{ badge: classes.badge }} invisible={!hasSearchResults} variant="dot">
                <SearchIcon />
              </Badge>
            )}
          />
        )}
        { panels.layers && hasAnyLayers && (
          <TabButton
            value="layers"
            icon={(
              <Badge classes={{ badge: classes.badge }} invisible={!hasCurrentLayers} variant="dot">
                <LayersIcon />
              </Badge>
            )}
          />
        )}
        { PluginComponents
          && PluginComponents.map(PluginComponent => (
            <TabButton
              key={PluginComponent.value}
              value={PluginComponent.value}
              icon={<PluginComponent />}
            />
          ))}
      </Tabs>
    );
  }
}

WindowSideBarButtons.propTypes = {
  addCompanionWindow: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
  hasAnnotations: PropTypes.bool,
  hasAnyAnnotations: PropTypes.bool,
  hasAnyLayers: PropTypes.bool,
  hasCurrentLayers: PropTypes.bool,
  hasSearchResults: PropTypes.bool,
  hasSearchService: PropTypes.bool,
  panels: PropTypes.arrayOf(PropTypes.bool),
  PluginComponents: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  sideBarPanel: PropTypes.string,
  t: PropTypes.func,
};

WindowSideBarButtons.defaultProps = {
  classes: {},
  hasAnnotations: false,
  hasAnyAnnotations: false,
  hasAnyLayers: false,
  hasCurrentLayers: false,
  hasSearchResults: false,
  hasSearchService: false,
  panels: [],
  PluginComponents: null,
  sideBarPanel: 'closed',
  t: key => key,
};
