import React from 'react';
import { mount } from 'enzyme';
import { IframeComm } from '../../../src/lib/IFrameComm';

/**
 *
 * @param props
 * @returns {*}
 */
function createWrapper(props) {
  return mount(
    <IframeComm
      handleReady={() => {}}
      handleReceiveMessage={() => {}}
      postMessageData="this is a test"
      {...props}
    />,
  );
}

let receivedMessage = {};
const mockIFrameContents = {
  contentWindow: {
    postMessage: (postMessageData) => {
      receivedMessage = postMessageData;
    },
  },
};

describe('IFrameComm', () => {
  let wrapper;
  it('renders properly', () => {
    const handleReady = jest.fn();
    const handleReceiveMessage = jest.fn();
    wrapper = createWrapper({ handleReady, handleReceiveMessage });
    expect(wrapper.find(IframeComm).length).toBe(1);
    wrapper.instance().setIFrameElement(mockIFrameContents);
    wrapper.instance().onLoad();
    expect(handleReady).toHaveBeenCalled();
    expect(receivedMessage === 'this is a test').toBeTruthy();
    wrapper.instance().onReceiveMessage();
    expect(handleReceiveMessage).toHaveBeenCalled();
  });
  it('updates props', () => {
    wrapper = createWrapper();
    wrapper.instance().setIFrameElement(mockIFrameContents);
    wrapper.instance().onLoad();
    wrapper.setProps({ postMessageData: 'this is another test' });
    wrapper.instance().setIFrameElement(mockIFrameContents);
    wrapper.instance().onLoad();
    expect(receivedMessage === 'this is another test').toBeTruthy();
  });
  it('returns data with no serialization option', () => {
    wrapper = createWrapper({ serializeMessage: false });
    wrapper.instance().setIFrameElement(mockIFrameContents);
    wrapper.instance().onLoad();
    expect(receivedMessage === 'this is a test').toBeTruthy();
  });
  it('returns data with when payload is an object', () => {
    wrapper = createWrapper({ postMessageData: { object: 'this is an object' } });
    wrapper.instance().setIFrameElement(mockIFrameContents);
    wrapper.instance().onLoad();
    expect(receivedMessage === '{"object":"this is an object"}').toBeTruthy();
  });
  it('ummounts', () => {
    wrapper = createWrapper();
    const componentWillUnmount = jest.spyOn(wrapper.instance(), 'componentWillUnmount');
    wrapper.unmount();
    expect(componentWillUnmount).toHaveBeenCalled();
  });
});
