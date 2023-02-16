import { shallow, mount } from 'enzyme';
import { IIIFIFrameCommunication } from '../../../src/components/IIIFIFrameCommunication';

/** */
function createWrapper(props) {
  return shallow(
    <IIIFIFrameCommunication
      src='https://iiifauth.digtest.co.uk/auth/token/login/01_Icarus_Breughel.jpg?origin=http://localhost:4444&messageId=https://iiifauth.digtest.co.uk/auth/token/login/01_Icarus_Breughel.jpg'
      title='AccessTokenSender'
      handleReceiveMessage={() => {}}
    />,
  );
}

describe('IIIFIFrameCommunication', () => {
  it('should render an iframe', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('iframe')).toHaveLength(1);
  });
});

describe('Register event listener', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should call handleReceiveMessage on message event', () => {
    const events = {};
    jest.spyOn(window, 'addEventListener').mockImplementation((event, onReceiveMessage) => {
      events[event] = onReceiveMessage;
    });
    jest.spyOn(window, 'removeEventListener').mockImplementation((event, onReceiveMessage) => {
      events[event] = undefined;
    });
    const props = { handleReceiveMessage: jest.fn() };
    const wrapper = mount(<IIIFIFrameCommunication {...props} />);
    events.message();

    expect(props.handleReceiveMessage).toBeCalledTimes(1);
    expect(window.addEventListener).toBeCalledWith('message', expect.any(Function));

    wrapper.unmount();
    expect(window.removeEventListener).toBeCalledWith('message', expect.any(Function), false);
  });
});
