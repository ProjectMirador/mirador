import { shallow } from 'enzyme';
import { Mosaic } from 'react-mosaic-component';
import MosaicRenderPreview from '../../../src/containers/MosaicRenderPreview';
import { WorkspaceMosaic } from '../../../src/components/WorkspaceMosaic';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WorkspaceMosaic
      classes={{}}
      windowIds={[]}
      workspaceId="foo"
      updateWorkspaceMosaicLayout={() => {}}
      {...props}
    />,
  );
}

describe('WorkspaceMosaic', () => {
  const windowIds = ['1', '2'];
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper({ windowIds });
  });
  it('should render properly with an initialValue', () => {
    expect(wrapper.dive().find(Mosaic).length).toEqual(1);
    expect(wrapper.dive().find(Mosaic).prop('initialValue')).toEqual({
      direction: 'row', first: '1', second: '2',
    });
  });
  describe('componentDidUpdate', () => {
    it('updates the workspace layout when windows change', () => {
      const updateWorkspaceMosaicLayout = jest.fn();
      wrapper = createWrapper({
        updateWorkspaceMosaicLayout,
        windowIds,
      });

      wrapper.setProps({ windowIds: [...windowIds, '3'] });

      expect(updateWorkspaceMosaicLayout).toHaveBeenCalled();
    });
    it('updates the workspace layout when windows are removed', () => {
      const updateWorkspaceMosaicLayout = jest.fn();
      wrapper = createWrapper({
        layout: { first: 1, second: 2 },
        updateWorkspaceMosaicLayout,
        windowIds,
      });
      wrapper.instance().windowPaths = { 2: ['second'] };
      wrapper.setProps({ windowIds: [1] });
      expect(updateWorkspaceMosaicLayout).toHaveBeenLastCalledWith(1);
    });
    it('when no windows remain', () => {
      const updateWorkspaceMosaicLayout = jest.fn();
      wrapper = createWrapper({
        updateWorkspaceMosaicLayout,
        windowIds,
      });
      wrapper.setProps({ windowIds: [] });
      expect(updateWorkspaceMosaicLayout).toHaveBeenLastCalledWith(null);
    });
    it('when the new and old layouts are the same', () => {
      const updateWorkspaceMosaicLayout = jest.fn();
      wrapper = createWrapper({
        layout: { first: 1, second: 2 },
        updateWorkspaceMosaicLayout,
        windowIds,
      });
      wrapper.setProps({ layout: { first: 1, second: 2 }, windowIds });
      expect(updateWorkspaceMosaicLayout).toHaveBeenCalledTimes(1);
    });
  });
  describe('bookkeepPath', () => {
    it('as windows are rendered keeps a reference to their path in binary tree', () => {
      wrapper.instance().tileRenderer('1', 'foo');
      expect(wrapper.instance().windowPaths).toEqual({ 1: 'foo' });
    });
  });
  describe('determineWorkspaceLayout', () => {
    it('when window ids do not match workspace layout', () => {
      wrapper = createWrapper({ layout: {}, windowIds });
      expect(wrapper.instance().determineWorkspaceLayout()).toMatchObject({
        direction: 'row', first: '1', second: '2',
      });
    });
    it('by default use workspace.layout', () => {
      wrapper = createWrapper({ layout: {}, windowIds: ['foo'] });
      expect(wrapper.instance().determineWorkspaceLayout()).toEqual('foo');
    });
    it('generates a new layout if windows do not match current layout', () => {
      wrapper = createWrapper({ layout: { first: 'foo', second: 'bark' }, windowIds: ['foo'] });
      expect(wrapper.instance().determineWorkspaceLayout()).toEqual('foo');
    });
    it('when window ids match workspace layout', () => {
      wrapper = createWrapper({ layout: {}, windowIds: ['foo'] });
      expect(wrapper.instance().determineWorkspaceLayout()).toBe('foo');
    });
  });
  describe('tileRenderer', () => {
    it('when window is available', () => {
      const renderedTile = wrapper.instance().tileRenderer('1', 'foo');
      expect(renderedTile).not.toBeNull();
      expect(shallow(renderedTile).find('ConnectedInternalMosaicWindow').length).toEqual(1);
      expect(shallow(renderedTile).find('WithStyles(Connect(WithPlugins(Window)))').length).toEqual(1);
      expect(shallow(renderedTile).props()).toEqual(expect.objectContaining({
        additionalControls: [],
        path: 'foo',
        toolbarControls: [],
      }));

      expect(shallow(shallow(renderedTile).props().renderPreview({ windowId: 1 })).matchesElement(
        <div className="mosaic-preview" aria-hidden>
          <MosaicRenderPreview windowId={1} />
        </div>,
      )).toBe(true);
    });
    it('when window is not available', () => {
      expect(wrapper.instance().tileRenderer('bar')).toBeNull();
    });
  });
  describe('mosaicChange', () => {
    it('calls the provided prop to update layout', () => {
      const updateWorkspaceMosaicLayout = jest.fn();
      wrapper = createWrapper({
        updateWorkspaceMosaicLayout,
        windowIds,
      });

      wrapper.instance().mosaicChange();
      expect(updateWorkspaceMosaicLayout).toBeCalled();
    });
  });
});
