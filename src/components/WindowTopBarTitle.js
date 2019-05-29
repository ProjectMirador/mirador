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
      classes, hideWindowTitle, manifestTitle,
    } = this.props;
    return !hideWindowTitle && (
      <Typography variant="h2" noWrap color="inherit" className={classes.title}>
        {manifestTitle}
      </Typography>
    );
  }
}

WindowTopBarTitle.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  hideWindowTitle: PropTypes.bool,
  manifestTitle: PropTypes.string,
};

WindowTopBarTitle.defaultProps = {
  hideWindowTitle: false,
  manifestTitle: '',
};
