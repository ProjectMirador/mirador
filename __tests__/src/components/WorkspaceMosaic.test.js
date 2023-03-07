import { shallow } from 'enzyme';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/store';
import { WorkspaceMosaic } from '../../../src/components/WorkspaceMosaic';

/** create wrapper */
function createWrapper(props) {
  return renderWithProviders(
    <WorkspaceMosaic
      classes={{}}
      windowIds={[]}
      workspaceId="foo"
      updateWorkspaceMosaicLayout={() => {}}
      {...props}
    />,
    {
      preloadedState: {
        windows: {
          1: { companionWindowIds: [] },
          2: { companionWindowIds: [] },
          3: { companionWindowIds: [] },
        },
      },
    },
  );
}

/* eslint-disable testing-library/no-node-access */
describe('WorkspaceMosaic', () => {
  const windowIds = ['1', '2'];
  let wrapper;
  it('should render properly with an initialValue', () => {
    wrapper = createWrapper({ windowIds });
    const tiles = wrapper.container.querySelectorAll('.mosaic-tile');

    expect(tiles).toHaveLength(2);
    expect(tiles[0]).toHaveStyle({
      bottom: '0%', left: '0%', right: '50%', top: '0%',
    });
    expect(tiles[1]).toHaveStyle({
      bottom: '0%', left: '50%', right: '0%', top: '0%',
    });
  });

  describe('componentDidUpdate', () => {
    it('updates the workspace layout when windows change', () => {
      const updateWorkspaceMosaicLayout = jest.fn();
      wrapper = createWrapper({
        updateWorkspaceMosaicLayout,
        windowIds,
      });

      wrapper.rerender(
        <WorkspaceMosaic classes={{}} windowIds={['1', '2', '3']} workspaceId="foo" updateWorkspaceMosaicLayout={updateWorkspaceMosaicLayout} />,
      );

      expect(updateWorkspaceMosaicLayout).toHaveBeenCalled();
    });
    it('updates the workspace layout when windows are removed', () => {
      const updateWorkspaceMosaicLayout = jest.fn();
      const props = {
        classes: {},
        layout: { direction: 'row', first: '1', second: '2' },
        updateWorkspaceMosaicLayout,
        windowIds,
        workspaceId: 'foo',
      };
      wrapper = createWrapper(props);

      wrapper.rerender(
        <WorkspaceMosaic {...props} windowIds={['1']} />,
      );

      expect(updateWorkspaceMosaicLayout).toHaveBeenLastCalledWith('1');
    });
    it('when no windows remain', () => {
      const updateWorkspaceMosaicLayout = jest.fn();
      wrapper = createWrapper({
        updateWorkspaceMosaicLayout,
        windowIds,
      });

      wrapper.rerender(
        <WorkspaceMosaic classes={{}} windowIds={[]} workspaceId="foo" updateWorkspaceMosaicLayout={updateWorkspaceMosaicLayout} />,
      );
      expect(updateWorkspaceMosaicLayout).toHaveBeenLastCalledWith(null);
    });
    it('when the new and old layouts are the same', () => {
      const updateWorkspaceMosaicLayout = jest.fn();
      wrapper = createWrapper({
        layout: { first: 1, second: 2 },
        updateWorkspaceMosaicLayout,
        windowIds,
      });

      wrapper.rerender(
        <WorkspaceMosaic classes={{}} windowIds={windowIds} layout={{ first: 1, second: 2 }} workspaceId="foo" updateWorkspaceMosaicLayout={updateWorkspaceMosaicLayout} />,
      );

      expect(updateWorkspaceMosaicLayout).toHaveBeenCalledTimes(1);
    });
  });
  describe('tile rendering', () => {
    it('when window is available', () => {
      wrapper = createWrapper({ windowIds });

      expect(screen.getAllByLabelText('window', { container: 'section' })[0]).toHaveAttribute('id', '1');
      expect(screen.getAllByLabelText('window', { container: 'section' })[1]).toHaveAttribute('id', '2');

      expect(wrapper.container.querySelector('.mosaic-window-title')).toBeEmptyDOMElement();
      expect(wrapper.container.querySelector('.mosaic-window-controls')).toBeEmptyDOMElement();
      expect(wrapper.container.querySelectorAll('.mosaic-preview')).toHaveLength(2);
      expect(wrapper.container.querySelector('.mosaic-preview')).toHaveAttribute('aria-hidden', 'true');
    });
  });
  describe('mosaicChange', () => {
    it('calls the provided prop to update layout', () => {
      const updateWorkspaceMosaicLayout = jest.fn();
      wrapper = shallow(<WorkspaceMosaic
        classes={{}}
        windowIds={windowIds}
        workspaceId="foo"
        updateWorkspaceMosaicLayout={updateWorkspaceMosaicLayout}
      />);

      wrapper.instance().mosaicChange();
      expect(updateWorkspaceMosaicLayout).toBeCalled();
    });
  });
});
