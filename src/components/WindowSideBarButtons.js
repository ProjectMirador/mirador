import { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/InfoSharp';
import AnnotationIcon from '@mui/icons-material/CommentSharp';
import AttributionIcon from '@mui/icons-material/CopyrightSharp';
import LayersIcon from '@mui/icons-material/LayersSharp';
import SearchIcon from '@mui/icons-material/SearchSharp';
import CanvasIndexIcon from './icons/CanvasIndexIcon';

const Root = styled(Tabs, { name: 'WindowSideBarButtons', slot: 'root' })({
  '& .MuiTabs-flexContainer': {
    flexDirection: 'column',
  },
  '&.MuiTabs-indicator': {
    display: 'none',
  },
});

const StyledTabButton = styled(Tab, { name: 'WindowSideBarButtons', slot: 'button' })(({ theme }) => ({
  '&.Mui-selected': {
    borderRight: '2px solid',
    borderRightColor: theme.palette.primary.main,
  },
  '&.MuiTab-root': {
    '&:active': {
      backgroundColor: theme.palette.action.active,
    },
    '&:focus': {
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
      backgroundColor: theme.palette.action.hover,
      textDecoration: 'none',
      // Reset on touch devices, it doesn't add specificity
    },
    '&:hover': {
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
      backgroundColor: theme.palette.action.hover,
      textDecoration: 'none',
      // Reset on touch devices, it doesn't add specificity
    },
    borderRight: '2px solid transparent',
    minWidth: 'auto',
  },
  fill: 'currentcolor',
}));

/** */
function TabButton({ t, value, ...tabProps }) {
  return (
    <Tooltip title={t('openCompanionWindow', { context: value })}>
      <StyledTabButton
        {...tabProps}
        value={value}
        aria-label={
          t('openCompanionWindow', { context: value })
        }
        disableRipple
      />
    </Tooltip>
  );
}

TabButton.propTypes = {
  t: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

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

    return (
      <Root
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
            onKeyUp={this.handleKeyUp}
            t={t}
            icon={(<InfoIcon />)}
          />
        )}
        { panels.attribution && (
          <TabButton
            value="attribution"
            onKeyUp={this.handleKeyUp}
            t={t}
            icon={(<AttributionIcon />)}
          />
        )}
        { panels.canvas && (
          <TabButton
            value="canvas"
            onKeyUp={this.handleKeyUp}
            t={t}
            icon={(<CanvasIndexIcon />)}
          />
        )}
        {panels.annotations && (hasAnnotations || hasAnyAnnotations) && (
          <TabButton
            value="annotations"
            onKeyUp={this.handleKeyUp}
            t={t}
            icon={(
              <Badge overlap="rectangular" color="notification" invisible={!hasAnnotations} variant="dot">
                <AnnotationIcon />
              </Badge>
            )}
          />
        )}
        {panels.search && hasSearchService && (
          <TabButton
            value="search"
            onKeyUp={this.handleKeyUp}
            t={t}
            icon={(
              <Badge overlap="rectangular" color="notification" invisible={!hasSearchResults} variant="dot">
                <SearchIcon />
              </Badge>
            )}
          />
        )}
        { panels.layers && hasAnyLayers && (
          <TabButton
            value="layers"
            onKeyUp={this.handleKeyUp}
            t={t}
            icon={(
              <Badge overlap="rectangular" color="notification" invisible={!hasCurrentLayers} variant="dot">
                <LayersIcon />
              </Badge>
            )}
          />
        )}
        { PluginComponents
          && PluginComponents.map(PluginComponent => (
            <TabButton
              onKeyUp={this.handleKeyUp}
              t={t}
              key={PluginComponent.value}
              value={PluginComponent.value}
              icon={<PluginComponent />}
            />
          ))}
      </Root>
    );
  }
}

WindowSideBarButtons.propTypes = {
  addCompanionWindow: PropTypes.func.isRequired,
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
