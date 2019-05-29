import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

/**
 * WindowTopBarTitle
 */
export class WindowTopBarTitle extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      classes, manifestTitle,
    } = this.props;
    return (
      <Typography variant="h2" noWrap color="inherit" className={classes.title}>
        {manifestTitle}
      </Typography>
    );
  }
}

WindowTopBarTitle.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  manifestTitle: PropTypes.string,
};

WindowTopBarTitle.defaultProps = {
  manifestTitle: '',
};
