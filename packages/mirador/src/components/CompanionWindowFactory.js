import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import CompanionWindowRegistry from '../lib/CompanionWindowRegistry';
import CompanionWindow from '../containers/CompanionWindow';
import ErrorContent from '../containers/ErrorContent';

/**
 * Render a companion window using the appropriate component for the content
 */
export function CompanionWindowFactory({
  content = null, id, t = key => key, windowId,
}) {
  const ErroredCompanionWindow = useCallback(({ error }) => (
    <CompanionWindow
      title={t('error')}
      windowId={windowId}
      id={id}
    >
      <ErrorContent error={error} windowId={windowId} companionWindowId={id} />
    </CompanionWindow>
  ), [windowId, t, id]);

  const DynamicCompanionWindowType = CompanionWindowRegistry[content];

  if (!DynamicCompanionWindowType) return null;

  return (
    <ErrorBoundary fallbackComponent={ErroredCompanionWindow}>
      <DynamicCompanionWindowType id={id} windowId={windowId} />
    </ErrorBoundary>
  );
}

CompanionWindowFactory.propTypes = {
  content: PropTypes.string,
  id: PropTypes.string.isRequired,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};
