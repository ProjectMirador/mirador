import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CompanionWindow from '../containers/CompanionWindow';
import SearchPanelControls from '../containers/SearchPanelControls';
/** */
export class SearchPanel extends Component {
  /** */
  render() {
    const {
      windowId,
      id,
      t,
    } = this.props;

    return (
      <CompanionWindow
        title={t('searchTitle')}
        windowId={windowId}
        id={id}
        titleControls={<SearchPanelControls cwId={id} windowId={windowId} />}
      />
    );
  }
}

SearchPanel.propTypes = {
  id: PropTypes.string.isRequired,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

SearchPanel.defaultProps = {
  t: key => key,
};
