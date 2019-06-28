import React from 'react';
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent';

/**
 * ScrollIndicatedDialogContent ~ Inject a style into the DialogContent component
 *                                to indicate there is scrollable content
*/
export function ScrollIndicatedDialogContent(props) {
  const { classes, className, ...otherProps } = props;
  const ourClassName = [className, classes.shadowScrollDialog].join(' ');

  return (
    <DialogContent className={ourClassName} {...otherProps} />
  );
}

ScrollIndicatedDialogContent.propTypes = {
  classes: PropTypes.shape({
    shadowScrollDialog: PropTypes.string,
  }).isRequired,

  className: PropTypes.string,
};

ScrollIndicatedDialogContent.defaultProps = {
  className: '',
};
