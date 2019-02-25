import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CompanionWindow from '../containers/CompanionWindow';

/** */
class CompanionArea extends Component {
  /** */
  render() {
    const {
      companionWindows,
      position,
      windowId,
      classes,
    } = this.props;

    return (
      <Grid
        container
        className={position === 'right' ? classes.rightContainer : classes.bottomContainer}
        wrap="nowrap"
      >
        {
          companionWindows
            .filter(cw => cw.position === position)
            .map(cw => (
              <Grid
                item
                key={cw.id}
                className={position === 'right' ? classes.rightItem : classes.bottomItem}
              >
                <CompanionWindow id={cw.id} windowId={windowId} position={position} />
              </Grid>
            ))
        }
      </Grid>
    );
  }
}

CompanionArea.propTypes = {
  windowId: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  companionWindows: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default CompanionArea;
