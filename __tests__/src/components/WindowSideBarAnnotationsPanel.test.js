import React from 'react';
import { shallow } from 'enzyme';
import { WindowSideBarAnnotationsPanel } from '../../../src/components/WindowSideBarAnnotationsPanel';

/** */
function createWrapper(props) {
  return shallow(
    <WindowSideBarAnnotationsPanel
      id="xyz"
      windowId="abc"
      {...props}
    />,
  );
}

describe('WindowSideBarAnnotationsPanel', () => {
  let wrapper;

  it('has a header', () => {
    wrapper = createWrapper();

    expect(
      wrapper.props().title,
    ).toBe('annotations');
  });

  it('renders a list with a list item for each annotation', () => {
    wrapper = createWrapper({
      annotations: [
        { id: 'abc123', content: 'First Annotation' },
        { id: 'xyz321', content: 'Last Annotation' },
      ],
    });

    expect(wrapper.find('WithStyles(ListItem)').length).toBe(2);
    expect(wrapper.find('SanitizedHtml[htmlString="First Annotation"]').length).toBe(1);
    expect(wrapper.find('SanitizedHtml[htmlString="Last Annotation"]').length).toBe(1);
  });
});
