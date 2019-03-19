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
    const { windowId } = this.props;
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.windowId = `${windowId}-sidebar-buttons`;
    this.keys = {
      end: 35,
      home: 36,
      up: 38,
      down: 40,
    };
  }

  /**
   *
   */
  componentDidMount() {
    this.tabs = Array.from(document.querySelectorAll(`#${this.windowId} button[role=tab]`));
    this.tabBar = this.tabs[0].parentElement;

    /*
      the change event isn't fired, when the tabs component is initialized,
      so we have to perform the required actions on our own
    */
    const selectedTab = this.tabs.find(t => (t.getAttribute('aria-selected')) === 'true');
    this.selectTab(selectedTab);
    this.deactivateTabs(this.tabs.indexOf(selectedTab));
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
   * @param {*} tab
   */
  selectTab(tab) {
    WindowSideBarButtons.activateTab(tab);
    this.deactivateTabs(this.tabs.indexOf(tab));
  }

  /**
   * @param {number} omit index to omit
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
    switch (event.keyCode) {
      case this.keys.up:
        event.preventDefault();
        return this.focusPreviousTab(event.target);
      case this.keys.down:
        event.preventDefault();
        return this.focusNextTab(event.target);
      default:
        return null;
    }
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
      <div id={this.windowId}>
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
            onKeyUp={this.handleKeyUp}
            value="annotations"
          />
        </Tabs>
      </div>
    );
  }
}

WindowSideBarButtons.propTypes = {
  hasAnnotations: PropTypes.bool,
  addCompanionWindow: PropTypes.func.isRequired,
  sideBarPanel: PropTypes.string,
  t: PropTypes.func,
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  windowId: PropTypes.string.isRequired,
};

WindowSideBarButtons.defaultProps = {
  hasAnnotations: false,
  sideBarPanel: 'closed',
  t: key => key,
  classes: {},
};
