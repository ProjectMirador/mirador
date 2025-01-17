import { render, screen } from 'test-utils';

import { App } from '../../../src/components/App';

// bypass component lazy-loading to make the test less flappy
import WorkspaceArea from '../../../src/containers/WorkspaceArea'; // eslint-disable-line no-unused-vars

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
    expect(await screen.findByRole('main')).toBeInTheDocument();
  });
});
