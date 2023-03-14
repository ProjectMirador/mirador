import i18next from 'i18next';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/store';
import { ErrorContent } from '../../../src/components/ErrorContent';

describe('ErrorContent', () => {
  it('should render everything when showJsError is true', async () => {
    renderWithProviders(
      <ErrorContent
        error={new Error('Invalid JSON')}
        windowId="xyz"
        manifestId="foo"
        classes={{}}
        t={i18next.t}
      />,
      {
        preloadedState: {
          config: {
            window: {
              showJsError: true,
            },
          },
          windows: {
            xyz: {
              collectionDialogOn: false,
              companionWindowIds: [],
            },
          },
        },
      },
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('An error occurred')).toBeInTheDocument();
    expect(screen.getByText('Technical details')).toBeInTheDocument();
    expect(document.querySelector('pre')).toHaveTextContent('Invalid JSON'); // eslint-disable-line testing-library/no-node-access
  });
  it('renders the alert title with no details when showJsError is false ', async () => {
    renderWithProviders(
      <ErrorContent
        error={new Error('Invalid JSON')}
        windowId="xyz"
        manifestId="foo"
        showJsError={false}
        classes={{}}
        t={i18next.t}
      />,
      {
        preloadedState: {
          config: {
            window: {
              showJsError: false,
            },
          },
          windows: {
            xyz: {
              collectionDialogOn: false,
              companionWindowIds: [],
            },
          },
        },
      },
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
