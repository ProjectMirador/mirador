import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import ns from '../config/css-ns';

/**
 *
 */
export class ViewerInfo extends Component {
  /** */
  render() {
    const {
      canvasCount,
      canvasIndex,
      canvasLabel,
      t,
    } = this.props;

    return (
      <div className={ns('osd-info')}>
        <Typography inline variant="caption" className={ns('canvas-count')}>
          {`${canvasIndex + 1} ${t('of')} ${canvasCount}`}
        </Typography>
        <Typography inline variant="caption" className={ns('canvas-label')}>
          {canvasLabel && ` • ${canvasLabel}`}
        </Typography>
      </div>
    );
  }
}

ViewerInfo.defaultProps = {
  canvasLabel: undefined,
  t: () => {},
};

ViewerInfo.propTypes = {
  canvasCount: PropTypes.number.isRequired,
  canvasIndex: PropTypes.number.isRequired,
  canvasLabel: PropTypes.string,
  t: PropTypes.func,
};
