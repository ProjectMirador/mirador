import React from 'react';
import { shallow } from 'enzyme';
import Menu from '@material-ui/core/Menu';
import MiradorMenuButton from '../../../src/containers/MiradorMenuButton';
import { PluginHook } from '../../../src/components/PluginHook';
import { WindowTopBarPluginMenu } from '../../../src/components/WindowTopBarPluginMenu';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WindowTopBarPluginMenu
      containerId="abc123-container"
      t={k => k}
      windowId="abc123"
      {...props}
    />,
  );
}

describe('WindowTopBarPluginMenu', () => {
  let wrapper;

  describe('when there are no plugins present', () => {
    it('renders a Fragment (and no Button/Menu/PluginHook)', () => {
      wrapper = createWrapper();
      expect(wrapper.find('Fragment').length).toBe(1);
      expect(wrapper.find(Menu).length).toBe(0);
      expect(wrapper.find(MiradorMenuButton).length).toBe(0);
      expect(wrapper.find(PluginHook).length).toBe(0);
    });
  });

  describe('when there are plugins present', () => {
    const PluginComponents = ['Plugin1', 'Plugin2'];

    it('renders the Button, Menu, and PluginHook', () => {
      wrapper = createWrapper({ PluginComponents });

      expect(wrapper.find(Menu).length).toBe(1);
      expect(wrapper.find(MiradorMenuButton).length).toBe(1);
      expect(wrapper.find(PluginHook).length).toBe(1);
    });

    it('the Menu is controlled by the Button clicks/local state', () => {
      wrapper = createWrapper({ PluginComponents });

      expect(wrapper.find(Menu).props().open).toBe(false);
      expect(wrapper.state().anchorEl).toBeNull();

      wrapper.find(MiradorMenuButton).simulate('click', { currentTarget: 'Button' });
      expect(wrapper.find(Menu).props().open).toBe(true);
      expect(wrapper.state().anchorEl).toEqual('Button');
    });

    it('the onClose prop of the Menu updates the open prop/state', () => {
      wrapper = createWrapper({ PluginComponents });
      wrapper.setState({ anchorEl: 'Button' });
      expect(wrapper.find(Menu).props().open).toBe(true);

      wrapper.find(Menu).props().onClose();
      expect(wrapper.find(Menu).props().open).toBe(false);
      expect(wrapper.state().anchorEl).toBeNull();
    });

    it('explicitly passes the local close handler to the PluginHook', () => {
      wrapper = createWrapper({ PluginComponents });

      wrapper.setState({ anchorEl: 'Button' });
      expect(wrapper.state().anchorEl).toEqual('Button');
      expect(wrapper.find(PluginHook).props().handleClose());
      expect(wrapper.state().anchorEl).toBeNull();
    });
  });
});
