import React from 'react';
import { shallow } from 'enzyme';
import { WindowSideBarAnnotationsPanel } from '../../../src/components/WindowSideBarAnnotationsPanel';

/** */
function createWrapper(props) {
  return shallow(
    <WindowSideBarAnnotationsPanel
      allAnnotationsAreHighlighted={false}
      classes={{}}
      deselectAnnotation={() => {}}
      highlightAnnotation={() => {}}
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

  it('has the AnnotationSettings component', () => {
    const titleControls = createWrapper().prop('titleControls');
    expect(titleControls.type.displayName).toEqual('Connect(WithPlugins(AnnotationSettings))');
  });

  it('renders a list with a list item for each annotation', () => {
    wrapper = createWrapper({
      annotations: [
        {
          content: 'First Annotation',
          id: 'abc123',
        },
        {
          content: 'Last Annotation',
          id: 'xyz321',
        },
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
        {
          content: 'First Annotation',
          id: 'abc123',
          targetId: 'example.com/iiif/12345',
        },
        {
          content: 'Last Annotation',
          id: 'xyz321',
          targetId: 'example.com/iiif/54321',
        },
      ],
      selectAnnotation,
    });

    wrapper.find('WithStyles(ListItem)').first().simulate('click');
    expect(selectAnnotation).toHaveBeenCalledWith('abc', 'example.com/iiif/12345', 'abc123');
  });

  it('triggers the deselectAnnotation prop with the correct arguments when clicking a selected annotation', () => {
    const deselectAnnotation = jest.fn();

    wrapper = createWrapper({
      annotations: [
        {
          content: 'First Annotation',
          id: 'abc123',
          targetId: 'example.com/iiif/12345',
        },
        {
          content: 'Last Annotation',
          id: 'xyz321',
          targetId: 'example.com/iiif/54321',
        },
      ],
      deselectAnnotation,
      selectedAnnotationIds: ['abc123'],
    });

    wrapper.find('WithStyles(ListItem)').first().simulate('click');
    expect(deselectAnnotation).toHaveBeenCalledWith('abc', 'example.com/iiif/12345', 'abc123');
  });

  describe('when allAnnotationsAreHighlighted is true', () => {
    it('does not highlight annotations on mouse enter', () => {
      const highlightAnnotation = jest.fn();

      wrapper = createWrapper({
        allAnnotationsAreHighlighted: true,
        annotations: [
          {
            content: 'Annotation',
            id: 'annoId',
            targetId: 'example.com/iiif/12345',
          },
        ],
        highlightAnnotation,
      });

      wrapper.find('WithStyles(ListItem)').first().simulate('mouseEnter');
      expect(highlightAnnotation).not.toHaveBeenCalled();

      wrapper.find('WithStyles(ListItem)').first().simulate('mouseLeave');
      expect(highlightAnnotation).not.toHaveBeenCalled();
    });
  });

  describe('when allAnnotationsAreHighlighted is false', () => {
    it('highlights annotations on mouse enter', () => {
      const highlightAnnotation = jest.fn();

      wrapper = createWrapper({
        annotations: [
          {
            content: 'Annotation',
            id: 'annoId',
            targetId: 'example.com/iiif/12345',
          },
        ],
        highlightAnnotation,
      });

      wrapper.find('WithStyles(ListItem)').first().simulate('mouseEnter');
      expect(highlightAnnotation).toHaveBeenCalledWith('abc', 'annoId');
    });

    it('sets the highlighted annotation to null on mouse leave', () => {
      const highlightAnnotation = jest.fn();

      wrapper = createWrapper({
        annotations: [
          {
            content: 'Annotation',
            id: 'annoId',
            targetId: 'example.com/iiif/12345',
          },
        ],
        highlightAnnotation,
      });

      wrapper.find('WithStyles(ListItem)').first().simulate('mouseLeave');
      expect(highlightAnnotation).toHaveBeenCalledWith('abc', null);
    });
  });
});
