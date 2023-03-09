import { screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import { Img } from 'react-image';
import { renderWithProviders } from '../../utils/store';
import { AttributionPanel } from '../../../src/components/AttributionPanel';

/**
 * Helper function to create a shallow wrapper around AttributionPanel
 */
function createWrapper(props) {
  return renderWithProviders(
    <AttributionPanel
      id="xyz"
      t={str => str}
      windowId="window"
      {...props}
    />,
    { preloadedState: { companionWindows: { xyz: { content: 'attribution' } } } },
  );
}

describe('AttributionPanel', () => {
  it('renders the required statement', () => {
    const requiredStatement = [
      { label: 'required statement', values: ['must be shown'] },
    ];
    createWrapper({ requiredStatement });

    expect(screen.getByText('required statement')).toBeInTheDocument();
    expect(screen.getByText('must be shown')).toBeInTheDocument();
  });

  it('renders the rights statement', () => {
    createWrapper({ rights: ['http://example.com', 'http://stanford.edu'] });

    expect(screen.getByText('rights')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'http://example.com' })).toHaveAttribute('href', 'http://example.com');
    expect(screen.getByRole('link', { name: 'http://stanford.edu' })).toHaveAttribute('href', 'http://stanford.edu');
  });

  it('does not render the rights statement if it is empty', () => {
    createWrapper({ rights: [] });
    expect(screen.queryByText('rights')).not.toBeInTheDocument();
  });

  it('renders the manifest logo', async () => {
    const manifestLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMMDQmtBwADgwF/Op8FmAAAAABJRU5ErkJggg==';

    const wrapper = shallow(<AttributionPanel
      id="xyz"
      t={str => str}
      windowId="window"
      manifestLogo={manifestLogo}
    />);

    expect(wrapper.find(Img).length).toBe(1);
    expect(wrapper.find(Img).props().src).toEqual([manifestLogo]);

    // TODO: lazy loading doesn't seem to trigger in the test environment
    // createWrapper({ manifestLogo });
    // expect(await screen.findByRole('image')).toHaveAttribute('src', manifestLogo);
  });
});
