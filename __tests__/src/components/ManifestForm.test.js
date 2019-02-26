import React from 'react';
import { shallow } from 'enzyme';
import { ManifestForm } from '../../../src/components/ManifestForm';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <ManifestForm
      fetchManifest={() => {}}
      t={str => str}
      {...props}
    />,
  );
}

describe('ManifestForm', () => {
  it('renders', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('TextField[label="addManifestUrl"]').length).toBe(1);
    expect(wrapper.find('WithStyles(Button)[type="submit"]').length).toBe(1);
  });

  it('has a cancel button when a cancel action is provided', () => {
    const onCancel = jest.fn();
    const wrapper = createWrapper({ onCancel });

    expect(wrapper.find('WithStyles(Button)[onClick]').length).toBe(1);

    wrapper.find('WithStyles(Button)[onClick]').simulate('click');

    expect(onCancel).toHaveBeenCalled();
  });

  it('triggers an action when the form is submitted', () => {
    const fetchManifest = jest.fn();
    const wrapper = createWrapper({ fetchManifest });

    wrapper.setState({ formValue: 'http://example.com/iiif' });

    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(fetchManifest).toHaveBeenCalledWith('http://example.com/iiif');
  });
});
