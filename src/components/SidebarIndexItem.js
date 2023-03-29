import { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import classNames from 'classnames';

/** */
export class SidebarIndexItem extends Component {
  /** */
  render() {
    const {
      classes, label,
    } = this.props;

    return (
      <Typography
        className={classNames(classes.label)}
        variant="body1"
      >
        {label}
      </Typography>
    );
  }
}

SidebarIndexItem.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
};
