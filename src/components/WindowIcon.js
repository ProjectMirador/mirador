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
    const {
      manifestation, classes,
    } = this.props;

    if (manifestation && manifestation.getLogo()) {
      return (<img src={manifestation.getLogo()} alt="" role="presentation" className={classes.logo} />);
    }

    return (
      <></>
    );
  }
}

WindowIcon.propTypes = {
  manifestation: PropTypes.shape({
    getLogo: PropTypes.func,
  }),
  classes: PropTypes.shape({ logo: PropTypes.string }),
};

WindowIcon.defaultProps = {
  manifestation: null,
  classes: {},
};

const styles = {
  logo: {
    height: '2.5rem',
    paddingRight: 8,
  },
};

export default withStyles(styles)(WindowIcon);
