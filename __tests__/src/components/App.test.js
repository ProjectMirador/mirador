import { shallow } from 'enzyme';
import PluginProvider from '../../../src/extend/PluginProvider';
import AppProviders from '../../../src/containers/AppProviders';
import { App } from '../../../src/components/App';

/** */
function createWrapper(props) {
  return shallow(
    <App
      {...props}
    />,
  );
}

describe('App', () => {
  it('should render all needed elements ', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(PluginProvider).length).toBe(1);
    expect(wrapper.find(AppProviders).length).toBe(1);
    expect(wrapper.find('Suspense').length).toBe(1);
  });
});
