import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

/**
 *
 */
class WindowSideBarButtons extends Component {
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
    const { toggleWindowSideBarPanel, t } = this.props;
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
            color={this.sideBarPanelCurrentlySelected('info') ? 'primary' : 'inherit'}
          />
        </IconButton>
      </>
    );
  }
}

WindowSideBarButtons.propTypes = {
  toggleWindowSideBarPanel: PropTypes.func,
  sideBarPanel: PropTypes.string,
  t: PropTypes.func,
};

WindowSideBarButtons.defaultProps = {
  toggleWindowSideBarPanel: () => {},
  sideBarPanel: 'closed',
  t: key => key,
};

export default WindowSideBarButtons;
