import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

/** */
export class SidebarIndexCompact extends Component {
  /** */
  render() {
    const {
      classes, canvas,
    } = this.props;

    return (
      <>
        <Typography
          className={classNames(classes.label)}
          variant="body1"
        >
          {canvas.label}
        </Typography>
      </>
    );
  }
}

SidebarIndexCompact.propTypes = {
  canvas: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
