import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

/** */
export class SidebarSequenceItem extends Component {
  /** */
  render() {
    const {
      sequence,
    } = this.props;

    /** */
    return (
      <>
        <Typography
          className={classNames(sequence.label)}
          variant="body1"
        >
          {sequence.label}
        </Typography>
      </>
    );
  }
}

SidebarSequenceItem.propTypes = {
  sequence: PropTypes.objectOf(PropTypes.any).isRequired,
};
