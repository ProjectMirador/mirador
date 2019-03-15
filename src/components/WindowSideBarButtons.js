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
  /**
   * sets the focus on the given tab
   */
  static focusTab(tab) {
    tab.focus();
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
  }

  /** */
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleTabRef = this.handleTabRef.bind(this);
    this.tabValues = ['info', 'canvas_navigation', 'annotations'];
  }

  /**
   *
   */
  componentDidMount() {
    // eslint-disable-next-line react/no-find-dom-node, prefer-destructuring
    this.tabBar = ReactDOM.findDOMNode(this.tabRef).childNodes[0].childNodes[0].childNodes[0];
    this.tabs = Array.from(this.tabBar.childNodes);
  }

  /**
  *
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
    this.deactivateTabs(event, this.tabValues.indexOf(value));
    addCompanionWindow(value);
  }

  /**
   * @param {object} event
   * @param {number} omit index to omit
   */
  deactivateTabs(tab, omit = -1) {
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
   * @param {object} event the onKeyDown event
   */
  handleKeyPress(event) {
    switch (event.keyCode) {
      case 38: // arrow up
        event.preventDefault();
        return this.focusPreviousTab(event.target);
      case 40: // arrow down
        event.preventDefault();
        return this.focusNextTab(event.target);
      default:
        return null;
    }
  }

  /**
   *
   * @param {object} event
   */
  focusPreviousTab(tab) {
    const previousTab = tab.previousSibling || this.tabBar.lastChild;
    WindowSideBarButtons.focusTab(previousTab);
  }

  /**
   *
   * @param {object} event
   */
  focusNextTab(tab) {
    const nextTab = tab.nextSibling || this.tabBar.firstChild;
    WindowSideBarButtons.focusTab(nextTab);
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
          onKeyDown={this.handleKeyPress}
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
          onKeyDown={this.handleKeyPress}
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
          onKeyDown={this.handleKeyPress}
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
