import React from 'react';
import { shallow, mount } from 'enzyme';
import manifesto from 'manifesto.js';
import manifestJson from '../../fixtures/version-2/019.json';
import { GalleryView } from '../../../src/components/GalleryView';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <GalleryView
      window={{ id: '1234', canvasIndex: 0 }}
      manifest={{ manifestation: manifesto.create(manifestJson) }}
      setCanvas={() => {}}
      {...props}
    />,
  );
}

describe('GalleryView', () => {
  let setCanvas;
  let wrapper;
  beforeEach(() => {
    setCanvas = jest.fn();
    wrapper = createWrapper({ setCanvas });
  });
  it('renders the component', () => {
    expect(wrapper.find('.mirador-gallery-container').length).toBe(1);
  });
  it('renders gallery items for all canvases', () => {
    expect(wrapper.find('.mirador-gallery-view-item').length).toBe(3);
  });
  it('sets a mirador-current-canvas class on current canvas', () => {
    expect(wrapper.find('.mirador-gallery-view-item.mirador-current-canvas'));
  });
  it('renders the canvas labels for each canvas in canvas items', () => {
    expect(wrapper.find('WithStyles(Typography)').length).toBe(3);
  });
  it('gives special class to current canvas item', () => {
    wrapper.find('.mirador-gallery-view-item').first().simulate('click');
    expect(setCanvas).toHaveBeenCalledWith('1234', 0);
    expect(wrapper.find('WithStyles(Typography)').length).toBe(3);
  });
  describe('instance methods', () => {
    it('calculates containerClasses', () => {
      wrapper = createWrapper({ setCanvas });
      expect(wrapper.instance().containerClasses(0)).toBe('mirador-gallery-view-item current-canvas');
      expect(wrapper.instance().containerClasses(1)).toBe('mirador-gallery-view-item ');
    });
  });
});
