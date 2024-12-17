import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import CompanionWindowRegistry from '../lib/CompanionWindowRegistry';
import CompanionWindow from '../containers/CompanionWindow';
import ErrorContent from '../containers/ErrorContent';

/**
 * Render a companion window using the appropriate component for the content
 */
export function CompanionWindowFactory({
  content = null, id,
}) {
  const { t } = useTranslation();
  const ErroredCompanionWindow = useCallback(({ error }) => (
    <CompanionWindow
      title={t('error')}
      id={id}
    >
      <ErrorContent error={error} companionWindowId={id} />
    </CompanionWindow>
  ), [t, id]);

  const DynamicCompanionWindowType = CompanionWindowRegistry[content];

  if (!DynamicCompanionWindowType) return null;

  return (
    <ErrorBoundary fallbackComponent={ErroredCompanionWindow}>
      <DynamicCompanionWindowType id={id} />
    </ErrorBoundary>
  );
}

CompanionWindowFactory.propTypes = {
  content: PropTypes.string,
  id: PropTypes.string.isRequired,
};
