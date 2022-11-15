import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import ErrorIcon from '@material-ui/icons/ErrorOutlineSharp';

/** */
function TitleTypography({ children, ...props }) {
  return (
    <Typography variant="h2" noWrap color="inherit" {...props}>
      {children}
    </Typography>
  );
}

TitleTypography.propTypes = {
  children: PropTypes.node.isRequired,
};

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
      classes, error, hideWindowTitle, isFetching, manifestTitle,
    } = this.props;

    let title = null;
    if (isFetching) {
      title = (
        <TitleTypography className={classes.title}>
          <Skeleton variant="text" />
        </TitleTypography>
      );
    } else if (error) {
      title = (
        <>
          <ErrorIcon color="error" />
          <TitleTypography color="textSecondary" className={classes.title}>
            {error}
          </TitleTypography>
        </>
      );
    } else if (hideWindowTitle) {
      title = (<div className={classes.title} />);
    } else {
      title = (
        <TitleTypography className={classes.title}>
          {manifestTitle}
        </TitleTypography>
      );
    }
    return title;
  }
}

WindowTopBarTitle.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  error: PropTypes.string,
  hideWindowTitle: PropTypes.bool,
  isFetching: PropTypes.bool,
  manifestTitle: PropTypes.string,
};

WindowTopBarTitle.defaultProps = {
  error: null,
  hideWindowTitle: false,
  isFetching: false,
  manifestTitle: '',
};
