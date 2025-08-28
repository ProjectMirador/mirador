import { screen, waitFor } from '@testing-library/react';

/**
 * Detects and fails early if an error dialog is rendered in the app.
 *
 * Many rendering failures in the app result in an error dialog that overlays the UI
 * and sets `aria-hidden="true"` on the main content. When this occurs, Testing Library
 * queries relying on accessibility roles (e.g., `findByRole`) will silently fail,
 * resulting in misleading test errors.
 */
export async function failIfErrorDialogPresent({ waitForRole, roleOptions } = {}) {
  await waitFor(() => {
    const message = getErrorDialogMessage();
    if (message) {
      throw new Error(`Content inaccessible due to error dialog: ${message}`);
    }

    if (waitForRole) {
      const el = screen.queryAllByRole(waitForRole, roleOptions);
      if (el) return true;
      throw new Error(`Waiting for role "${waitForRole}" or error dialog`);
    }

    return true;
  });
}

/**
 * Helper to extract the error message from the dialog
 */
function getErrorDialogMessage() {
  /* eslint-disable testing-library/no-node-access */
  const errorDialog = document.querySelector('h2#error-dialog-title');
  return errorDialog
    ? errorDialog.closest('[role="dialog"]')?.querySelector('p')?.textContent ?? 'Unknown error'
    : null;
  /* eslint-enable testing-library/no-node-access */
}

/**
 * Safe version of findByRole that fails early if an error dialog is present.
 */
export async function safeFindByRole(role, options = {}, timeout) {
  await failIfErrorDialogPresent({ roleOptions: options, waitForRole: role });
  return screen.findByRole(role, options, { timeout });
}

/**
 * Safe version of findAllByRole that fails early if an error dialog is present.
 */
export async function safeFindAllByRole(role, options = {}, timeout) {
  await failIfErrorDialogPresent({ roleOptions: options, waitForRole: role });
  return screen.findAllByRole(role, options, { timeout });
}
