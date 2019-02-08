import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

/**
 */
class WindowIcon extends Component {
  /**
   * render
   * @return
   */
  render() {
    const { manifestLogo, classes } = this.props;

    const img = manifestLogo && (
      <img
        src={manifestLogo}
        alt=""
        role="presentation"
        className={classes.logo}
      />
    );

    return (
      <>
        {img}
      </>
    );
  }
}

WindowIcon.propTypes = {
  manifestLogo: PropTypes.string,
  classes: PropTypes.shape({ logo: PropTypes.string }).isRequired,
};

WindowIcon.defaultProps = {
  manifestLogo: null,
};

const styles = {
  logo: {
    height: '2.5rem',
    paddingRight: 8,
  },
};

export default withStyles(styles)(WindowIcon);
