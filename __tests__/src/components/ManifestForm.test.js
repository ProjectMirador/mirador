import React from 'react';
import { mount } from 'enzyme';
import { ManifestForm } from '../../../src/components/ManifestForm';

/** create wrapper */
function createWrapper(props) {
  return mount(
    <ManifestForm
      fetchManifest={() => {}}
      t={str => str}
      {...props}
    />,
  );
}


describe('ManifestForm', () => {
  it('renders', () => {
    const wrapper = createWrapper({ addResourcesOpen: false });
    expect(wrapper.find('TextField[label="addManifestUrl"]').length).toBe(1);
    wrapper.setProps({ addResourcesOpen: true });
    expect(wrapper.find('TextField[label="addManifestUrl"] input').instance()).toEqual(document.activeElement);
    expect(wrapper.find('WithStyles(Button)[type="submit"]').length).toBe(1);
  });

  it('has a cancel button when a cancel action is provided', () => {
    const onCancel = jest.fn();
    const wrapper = createWrapper({ addResourcesOpen: true, onCancel });
    wrapper.setState({ formValue: 'asdf' });

    expect(wrapper.find('WithStyles(Button)[onClick]').length).toBe(1);

    wrapper.find('WithStyles(Button)[onClick]').simulate('click');

    expect(onCancel).toHaveBeenCalled();
    expect(wrapper.state().formValue).toBe('');
  });

  it('triggers an action when the form is submitted', () => {
    const fetchManifest = jest.fn();
    const onSubmit = jest.fn();
    const wrapper = createWrapper({ addResourcesOpen: true, fetchManifest, onSubmit });
    wrapper.setState({ formValue: 'asdf' });

    wrapper.setState({ formValue: 'http://example.com/iiif' });

    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(fetchManifest).toHaveBeenCalledWith('http://example.com/iiif');
    expect(onSubmit).toHaveBeenCalled();
    expect(wrapper.state().formValue).toBe('');
  });
});
