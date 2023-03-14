import { render, screen } from '@testing-library/react';
import { BackgroundPluginArea } from '../../../src/components/BackgroundPluginArea';

/** */
const mockComponent = () => (
  <div data-testid="test" />
);

describe('BackgroundPluginArea', () => {
  it('renders the component', () => {
    render(<BackgroundPluginArea PluginComponents={[mockComponent]} />);
    expect(screen.getByTestId('test')).toBeInTheDocument();
  });
});
