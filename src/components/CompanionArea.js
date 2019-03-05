import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CompanionWindow from '../containers/CompanionWindow';

/** */
export class CompanionArea extends Component {
  /** */
  render() {
    const { companionWindows, windowId } = this.props;

    return (
      <>
        {
          companionWindows.map(cw => (
            <CompanionWindow id={cw.id} key={cw.id} windowId={windowId} />
          ))
        }
      </>
    );
  }
}

CompanionArea.propTypes = {
  windowId: PropTypes.string.isRequired,
  companionWindows: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
