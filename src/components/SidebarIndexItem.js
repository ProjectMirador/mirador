import { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

/** */
export class SidebarIndexItem extends Component {
  /** */
  render() {
    const {
      label,
    } = this.props;

    return (
      <Typography
        variant="body1"
      >
        {label}
      </Typography>
    );
  }
}

SidebarIndexItem.propTypes = {
  label: PropTypes.string.isRequired,
};
