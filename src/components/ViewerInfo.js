import { Component } from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import classNames from 'classnames';
import ns from '../config/css-ns';

const StyledOsdInfo = styled('div')(() => ({
  order: 2,
  overflow: 'hidden',
  paddingBottom: 3,
  textOverflow: 'ellipsis',
  unicodeBidi: 'plaintext',
  whiteSpace: 'nowrap',
  width: '100%',
}));

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
      <StyledOsdInfo className={classNames(ns('osd-info'))}>
        <Typography display="inline" variant="caption" className={ns('canvas-count')}>
          { t('pagination', { current: canvasIndex + 1, total: canvasCount }) }
        </Typography>
        <Typography display="inline" variant="caption" className={ns('canvas-label')}>
          {canvasLabel && ` • ${canvasLabel}`}
        </Typography>
      </StyledOsdInfo>
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
