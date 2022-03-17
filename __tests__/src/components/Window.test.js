import React from 'react';
import { shallow } from 'enzyme';
import { Window } from '../../../src/components/Window';
import WindowTopBar from '../../../src/containers/WindowTopBar';
import PrimaryWindow from '../../../src/containers/PrimaryWindow';
import IIIFAuthentication from '../../../src/containers/IIIFAuthentication';
import ErrorContent from '../../../src/containers/ErrorContent';

/** create wrapper */
function createWrapper(props, context) {
  return shallow(
    <Window
      windowId="123"
      manifestId="foo"
      classes={{}}
      t={k => k}
      {...props}
    />,
    { context },
  );
}

describe('Window', () => {
  let wrapper;
  it('should render outer element', () => {
    wrapper = createWrapper();
    expect(wrapper.find('.mirador-window')).toHaveLength(1);
  });
  it('should render <WindowTopBar>', () => {
    wrapper = createWrapper();
    expect(wrapper.find(WindowTopBar)).toHaveLength(1);
  });
  it('should render <PrimaryWindow>', () => {
    wrapper = createWrapper();
    expect(wrapper.find(PrimaryWindow)).toHaveLength(1);
  });
  it('renders <WindowAuthenticationBar>', () => {
    wrapper = createWrapper();
    expect(wrapper.find(IIIFAuthentication)).toHaveLength(1);
  });
  it('renders manifest error', () => {
    wrapper = createWrapper({ manifestError: 'Invalid JSON' });
    expect(wrapper.find(ErrorContent)).toHaveLength(1);
    expect(wrapper.find(ErrorContent).prop('error')).toEqual({ stack: 'Invalid JSON' });
  });

  describe('when workspaceType is mosaic', () => {
    xit('calls the context mosaicWindowActions connectDragSource method to make WindowTopBar draggable', () => {
      const connectDragSource = jest.fn(component => component);
      wrapper = createWrapper({ windowDraggable: true, workspaceType: 'mosaic' }, { mosaicWindowActions: { connectDragSource } });
      expect(wrapper.find(WindowTopBar)).toHaveLength(1);
      expect(connectDragSource).toHaveBeenCalled();
    });

    it('does not call the context mosaicWindowActions connectDragSource when the windowDraggable is set to false', () => {
      const connectDragSource = jest.fn(component => component);
      wrapper = createWrapper({ windowDraggable: false, workspaceType: 'mosaic' }, { mosaicWindowActions: { connectDragSource } });
      expect(wrapper.find(WindowTopBar)).toHaveLength(1);
      expect(connectDragSource).not.toHaveBeenCalled();
    });
  });
});
