import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTabRef = this.handleTabRef.bind(this);

    this.keys = {
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
    // eslint-disable-next-line react/no-find-dom-node
    this.tabs = Array.from(ReactDOM.findDOMNode(this.tabRef).getElementsByTagName('button'));
    this.tabBar = this.tabs[0].parent;
    this.selectTab(this.tabs[0]);
  }

  /**
  * ref handler for the tab
  * @param {*} node
  */
  handleTabRef(node) {
    if (node != null) {
      this.tabRef = node;
    }
  }

  /**
   * @param {object} event the change event
   * @param {string} value the tab's value
  */
  handleChange(event, value) {
    const { addCompanionWindow } = this.props;
    this.selectTab(event.target);
    addCompanionWindow(value);
  }

  /**
   * select the given tab
   * @param {*} tab
   */
  selectTab(tab) {
    tab.removeAttribute('tabindex');
    tab.setAttribute('aria-selected', 'true');
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
   *
   * @param {object} event the keyDown event
   */
  handleKeyDown(event) {
    switch (event.keyCode) {
      case this.keys.home:
        event.preventDefault();
        return this.focusFirstTab();
      case this.keys.end:
        event.preventDefault();
        return this.focusLastTab();
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
   *
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
   *
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
          onKeyDown={this.handleKeyDown}
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
          onKeyDown={this.handleKeyDown}
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
          onKeyDown={this.handleKeyDown}
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
