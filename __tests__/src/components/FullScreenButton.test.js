import { shallow } from 'enzyme';
import FullscreenIcon from '@material-ui/icons/FullscreenSharp';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExitSharp';
import MiradorMenuButton from '../../../src/containers/MiradorMenuButton';
import { FullScreenButton } from '../../../src/components/FullScreenButton';
import FullScreenContext from '../../../src/contexts/FullScreenContext';

/** */
function createWrapper(props, contextProps = { active: false }) {
  return shallow(
    <FullScreenButton
      classes={{}}
      className="xyz"
      {...props}
    />,
    {
      wrappingComponent: FullScreenContext.Provider,
      wrappingComponentProps: { value: { enter: () => { }, exit: () => { }, ...contextProps } },
    },
  ).dive();
}

describe('FullScreenButton', () => {
  let wrapper;
  let menuButton;

  it('renders without an error', () => {
    wrapper = createWrapper();

    expect(wrapper.find(MiradorMenuButton).length).toBe(1);
    expect(wrapper.find(MiradorMenuButton).prop('className')).toBe('xyz');
  });

  describe('when not in fullscreen', () => {
    let enter;
    beforeAll(() => {
      enter = jest.fn();
      wrapper = createWrapper({}, { enter });
      menuButton = wrapper.find(MiradorMenuButton);
    });

    it('has the FullscreenIcon', () => {
      expect(menuButton.children(FullscreenIcon).length).toBe(1);
    });

    it('has the proper aria-label i18n key', () => {
      expect(menuButton.props()['aria-label']).toEqual('workspaceFullScreen');
    });

    it('triggers the handle enter with the appropriate boolean', () => {
      menuButton.props().onClick(); // Trigger the onClick prop
      expect(enter).toHaveBeenCalled();
    });
  });

  describe('when in fullscreen', () => {
    let exit;
    beforeAll(() => {
      exit = jest.fn();
      wrapper = createWrapper({}, { active: true, exit });
      menuButton = wrapper.find(MiradorMenuButton);
    });

    it('has the FullscreenExitIcon', () => {
      expect(menuButton.children(FullscreenExitIcon).length).toBe(1);
    });

    it('has the proper aria-label', () => {
      expect(menuButton.props()['aria-label']).toEqual('exitFullScreen');
    });

    it('triggers the handle exit with the appropriate boolean', () => {
      menuButton.props().onClick(); // Trigger the onClick prop
      expect(exit).toHaveBeenCalled();
    });
  });
});
