import React from 'react';
import { shallow } from 'enzyme';
import { CanvasAnnotations } from '../../../src/components/CanvasAnnotations';

/** Utility function to wrap CanvasAnnotations */
function createWrapper(props) {
  return shallow(
    <CanvasAnnotations
      allAnnotationsAreHighlighted={false}
      classes={{}}
      deselectAnnotation={() => {}}
      highlightAnnotation={() => {}}
      index={0}
      label="A Canvas Label"
      selectAnnotation={() => {}}
      t={(key, args) => ({ args, key })}
      totalSize={1}
      windowId="abc"
      {...props}
    />,
  );
}

describe('CanvasAnnotations', () => {
  let wrapper;
  const annotations = [
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
  ];


  it('renders a heading with the appropriate context based on index and totalSize', () => {
    wrapper = createWrapper({ annotations });

    expect(wrapper.find('WithStyles(Typography)').length).toBe(1);
    let heading = wrapper.find('WithStyles(Typography)').props().children;
    expect(heading.key).toEqual('annotationCanvasLabel');
    expect(heading.args.label).toEqual('A Canvas Label');
    expect(heading.args.context).toEqual('1/1');

    wrapper = createWrapper({ annotations, index: 1, totalSize: 2 });
    heading = wrapper.find('WithStyles(Typography)').props().children;
    expect(heading.args.context).toEqual('2/2');
  });

  it('renders a List w/ a ListItem for every annotation', () => {
    wrapper = createWrapper({ annotations });

    expect(wrapper.find('WithStyles(List)').length).toEqual(1);
    expect(wrapper.find('WithStyles(ListItem)').length).toEqual(2);
  });

  it('renders nothing when there are no annotations', () => {
    wrapper = createWrapper();
    expect(wrapper.find('WithStyles(Typography)').length).toBe(0);
  });

  describe('interacting with annotations', () => {
    it('triggers the selectAnnotation prop with the correct arguments when clicking an unselected annotation', () => {
      const selectAnnotation = jest.fn();

      wrapper = createWrapper({
        annotations,
        selectAnnotation,
      });

      wrapper.find('WithStyles(ListItem)').first().simulate('click');
      expect(selectAnnotation).toHaveBeenCalledWith('abc', 'example.com/iiif/12345', 'abc123');
    });

    it('triggers the deselectAnnotation prop with the correct arguments when clicking a selected annotation', () => {
      const deselectAnnotation = jest.fn();

      wrapper = createWrapper({
        annotations,
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
});
