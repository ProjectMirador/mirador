import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/store';
import { App } from '../../../src/components/App';

/** */
function createWrapper(props) {
  return renderWithProviders(
    <App
      {...props}
    />,
  );
}

describe('App', () => {
  it('should asynchronously render all needed elements', async () => {
    createWrapper();

    expect(screen.queryByRole('main')).not.toBeInTheDocument();
    await screen.findByText('welcome');

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
