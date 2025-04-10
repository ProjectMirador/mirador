import { render, screen } from '@tests/utils/test-utils';
import { PluginHook } from '../../../src/components/PluginHook';
import { usePlugins } from '../../../src/extend/usePlugins';

vi.mock('../../../src/extend/usePlugins');

/** */
const mockComponentA = () => (
  <div data-testid="testA" />
);

/** */
const mockComponentB = () => (
  <div data-testid="testB" />
);

describe('WindowTopBarPluginArea', () => {
  it('renders nothing when no plugins passed', () => {
    vi.mocked(usePlugins).mockReturnValue({ PluginComponents: [] });
    render(<PluginHook />);
    expect(screen.queryByTestId('testA')).not.toBeInTheDocument();
    expect(screen.queryByTestId('testB')).not.toBeInTheDocument();
  });

  it('renders plugin components if some passed', () => {
    vi.mocked(usePlugins).mockReturnValue({ PluginComponents: [mockComponentA, mockComponentB] });
    render(<PluginHook />);
    expect(screen.getByTestId('testA')).toBeInTheDocument();
    expect(screen.getByTestId('testB')).toBeInTheDocument();
  });

  it('does not pass classes to PluginComponents (which will throw warnings for styles plugins)', () => {
    vi.mocked(usePlugins).mockReturnValue({ PluginComponents: [mockComponentA] });
    render(
      <PluginHook
        classes={{ someLocal: 'classes' }}
      />,
    );
    // if called with nothing passed as args, .toHaveClass checks for existence of any classes
    expect(screen.getByTestId('testA')).not.toHaveClass();
  });
});
