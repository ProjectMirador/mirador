import { render, screen } from 'test-utils';

import { App } from '../../../src/components/App';

/** */
function createWrapper(props) {
  return render(
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
