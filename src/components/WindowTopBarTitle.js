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
    let title = null;
    if (hideWindowTitle) {
      title = (<div className={classes.title} />);
    } else {
      title = (
        <Typography variant="h2" noWrap color="inherit" className={classes.title}>
          {manifestTitle}
        </Typography>
      );
    }
    return title;
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
