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
  /**
   * selects the given tab
   * @param {*} tab the tab to activate
   */
  static activateTab(tab) {
    tab.removeAttribute('tabindex');
    tab.setAttribute('aria-selected', 'true');
  }

  /** */
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.keys = {
      down: 'ArrowDown',
      end: 'End',
      home: 'Home',
      up: 'ArrowUp',
    };

    this.chars = {
      down: 40,
      end: 35,
      home: 36,
      up: 38,
    };
  }

  /**
   *
   */
  componentDidMount() {
    this.tabs = Array.from(document.querySelectorAll(`#${this.containerId} button[role=tab]`));
    this.tabBar = this.tabs[0].parentElement;

    /*
      the change event isn't fired, when the tabs component is initialized,
      so we have to perform the required actions on our own
    */
    const selectedTab = this.tabs.find(t => (t.getAttribute('aria-selected')) === 'true');
    this.selectTab(selectedTab);
    selectedTab.focus();
  }

  /**
   * @param {object} event the change event
   * @param {string} value the tab's value
  */
  handleChange(event, value) {
    const { addCompanionWindow } = this.props;
    const tab = event.target;
    this.selectTab(tab);
    addCompanionWindow(value);
  }

  /**
   *
   * @param {*} tab the tab to select
   */
  selectTab(tab) {
    WindowSideBarButtons.activateTab(tab);
    this.deactivateTabs(this.tabs.indexOf(tab));
  }

  /**
   * @param {number} omit tab index to omit
   */
  deactivateTabs(omit = -1) {
    this.tabs.map((v, k) => {
      if (k !== omit) {
        v.setAttribute('tabindex', '-1');
        v.setAttribute('aria-selected', 'false');
      }
      return null;
    });
  }

  /**
   *
   * @param {object} event the keyUp event
   */
  handleKeyUp(event) {
    if (event.key === this.keys.up || event.which === this.chars.up) {
      event.preventDefault();
      return this.focusPreviousTab(event.target);
    }
    if (event.key === this.keys.down || event.which === this.chars.down) {
      event.preventDefault();
      return this.focusNextTab(event.target);
    }
    return null;
  }

  /**
   * focus the first tab
   */
  focusFirstTab() {
    this.tabBar.firstChild.focus();
  }

  /**
   * focus the previous tab
   * @param {object} tab the currently selected tab
   */
  focusPreviousTab(tab) {
    const previousTab = tab.previousSibling || this.tabBar.lastChild;
    previousTab.focus();
  }

  /**
   * focus the last tab
   */
  focusLastTab() {
    this.tabBar.lastChild.focus();
  }

  /**
   * focus the next tab
   * @param {object} tab the currently selected tab
   */
  focusNextTab(tab) {
    const nextTab = tab.nextSibling || this.tabBar.firstChild;
    nextTab.focus();
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
      sideBarPanel,
      t,
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
        ref={this.handleTabRef}
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
          TouchRippleProps={{ classes: { child: classes.tabRipple } }}
          onKeyUp={this.handleKeyUp}
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
          TouchRippleProps={{ classes: { child: classes.tabRipple } }}
          onKeyUp={this.handleKeyUp}
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
          TouchRippleProps={{ classes: { child: classes.tabRipple } }}
          onKeyUp={this.handleKeyUp}
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
