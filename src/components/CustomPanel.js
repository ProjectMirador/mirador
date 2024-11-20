import PropTypes from 'prop-types';
import CompanionWindow from '../containers/CompanionWindow';

/**
 * a custom panel that can be used for anything
 */
export function CustomPanel({
  id, children = null, t, title, windowId,
}) {
  return (
    <CompanionWindow
      title={t(title)}
      id={id}
      windowId={windowId}
    >
      {children}
    </CompanionWindow>
  );
}

CustomPanel.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  windowId: PropTypes.string.isRequired,
};
