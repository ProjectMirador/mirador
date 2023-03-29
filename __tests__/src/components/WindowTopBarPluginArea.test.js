import { render, screen } from 'test-utils';
import { WindowTopBarPluginArea } from '../../../src/components/WindowTopBarPluginArea';

/** */
const mockComponent = () => (
  <div data-testid="test" />
);

describe('WindowTopBarPluginArea', () => {
  it('renders the component', () => {
    render(<WindowTopBarPluginArea PluginComponents={[mockComponent]} />);
    expect(screen.getByTestId('test')).toBeInTheDocument();
  });
});
