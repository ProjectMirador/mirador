import React from 'react';
import { shallow } from 'enzyme';
import { WindowSideBarAnnotationsPanel } from '../../../src/components/WindowSideBarAnnotationsPanel';

/** */
function createWrapper(props) {
  return shallow(
    <WindowSideBarAnnotationsPanel
      classes={{}}
      deselectAnnotation={() => {}}
      selectAnnotation={() => {}}
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

  it('triggers the selectAnnotation prop with the correct arguments when clicking an unselected annotation', () => {
    const selectAnnotation = jest.fn();

    wrapper = createWrapper({
      annotations: [
        { id: 'abc123', targetId: 'example.com/iiif/12345', content: 'First Annotation' },
        { id: 'xyz321', targetId: 'example.com/iiif/54321', content: 'Last Annotation' },
      ],
      selectAnnotation,
    });

    wrapper.find('WithStyles(ListItem)').first().simulate('click');
    expect(selectAnnotation).toHaveBeenCalledWith('abc', 'example.com/iiif/12345', 'abc123');
  });

  it('triggers the deselectAnnotation prop with the correct arguments when clicking a selected annotation', () => {
    const deselectAnnotation = jest.fn();

    wrapper = createWrapper({
      selectedAnnotationIds: ['abc123'],
      annotations: [
        { id: 'abc123', targetId: 'example.com/iiif/12345', content: 'First Annotation' },
        { id: 'xyz321', targetId: 'example.com/iiif/54321', content: 'Last Annotation' },
      ],
      deselectAnnotation,
    });

    wrapper.find('WithStyles(ListItem)').first().simulate('click');
    expect(deselectAnnotation).toHaveBeenCalledWith('abc', 'example.com/iiif/12345', 'abc123');
  });
});
