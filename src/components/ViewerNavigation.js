import NavigationIcon from '@mui/icons-material/PlayCircleOutlineSharp';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import ns from '../config/css-ns';

/**
 */
export function ViewerNavigation({
  hasNextCanvas = false,
  hasPreviousCanvas = false,
  setNextCanvas = () => {},
  setPreviousCanvas = () => {},
  t,
  beforeClick,
  viewingDirection = '',
}) {
  let htmlDir = 'ltr';
  let previousIconStyle = {};
  let nextIconStyle = {};
  switch (viewingDirection) {
    case 'top-to-bottom':
      previousIconStyle = { transform: 'rotate(270deg)' };
      nextIconStyle = { transform: 'rotate(90deg)' };
      break;
    case 'bottom-to-top':
      previousIconStyle = { transform: 'rotate(90deg)' };
      nextIconStyle = { transform: 'rotate(270deg)' };
      break;
    case 'right-to-left':
      htmlDir = 'rtl';
      previousIconStyle = {};
      nextIconStyle = { transform: 'rotate(180deg)' };
      break;
    default:
      previousIconStyle = { transform: 'rotate(180deg)' };
      nextIconStyle = {};
  }

  return (
    <div
      className={classNames(ns('osd-navigation'))}
      dir={htmlDir}
    >
      <MiradorMenuButton
        aria-label={t('previousCanvas')}
        className={ns('previous-canvas-button')}
        disabled={!hasPreviousCanvas}
        onClick={() => { beforeClick(); hasPreviousCanvas && setPreviousCanvas(); }}
      >
        <NavigationIcon style={previousIconStyle} />
      </MiradorMenuButton>
      <MiradorMenuButton
        aria-label={t('nextCanvas')}
        className={ns('next-canvas-button')}
        disabled={!hasNextCanvas}
        onClick={() => { beforeClick(); hasNextCanvas && setNextCanvas(); }}
      >
        <NavigationIcon style={nextIconStyle} />
      </MiradorMenuButton>
    </div>
  );
}

ViewerNavigation.propTypes = {
  beforeClick: PropTypes.func,
  hasNextCanvas: PropTypes.bool,
  hasPreviousCanvas: PropTypes.bool,
  setNextCanvas: PropTypes.func,
  setPreviousCanvas: PropTypes.func,
  t: PropTypes.func.isRequired,
  viewingDirection: PropTypes.string,
};

ViewerNavigation.defaultProps = {
  beforeClick: () => {},
  hasNextCanvas: false,
  hasPreviousCanvas: false,
  setNextCanvas: () => {},
  setPreviousCanvas: () => {},
  viewingDirection: '',
};
