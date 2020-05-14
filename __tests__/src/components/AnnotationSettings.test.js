import React from 'react';
import { shallow } from 'enzyme';
import MiradorMenuButton from '../../../src/containers/MiradorMenuButton';
import { AnnotationSettings } from '../../../src/components/AnnotationSettings';

/** */
function createWrapper(props) {
  return shallow(
    <AnnotationSettings
      displayAll={false}
      displayAllDisabled={false}
      t={k => k}
      toggleAnnotationDisplay={() => {}}
      windowId="abc123"
      {...props}
    />,
  );
}

describe('AnnotationSettings', () => {
  let wrapper;
  const toggleAnnotationDisplayMock = jest.fn();

  it('renders a MiradorMenuButton', () => {
    wrapper = createWrapper();
    expect(wrapper.find(MiradorMenuButton).length).toBe(1);
  });

  it('calls the toggleAnnotationDisplay prop function on click', () => {
    wrapper = createWrapper({ toggleAnnotationDisplay: toggleAnnotationDisplayMock });
    wrapper.find(MiradorMenuButton).simulate('click');

    expect(toggleAnnotationDisplayMock).toHaveBeenCalledTimes(1);
  });
});
