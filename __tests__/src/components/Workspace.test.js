import React from 'react';
import { shallow } from 'enzyme';
import { Mosaic } from 'react-mosaic-component';
import Workspace from '../../../src/components/Workspace';

describe('Workspace', () => {
  const windows = { 1: { id: 1 }, 2: { id: 2 } };
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Workspace
        windows={windows}
        workspace={{}}
        updateWorkspaceMosaicLayout={() => {}}
      />,
    );
  });
  it('should render properly with an initialValue', () => {
    expect(wrapper.matchesElement(
      <div className="mirador-workspace">
        <Mosaic initialValue={{ direction: 'row', first: '1', second: '2' }} />
      </div>,
    )).toBe(true);
  });
  describe('determineWorkspaceLayout', () => {
    it('when window ids do not match workspace layout', () => {
      wrapper = shallow(
        <Workspace
          windows={windows}
          workspace={{ layout: 'foo' }}
          updateWorkspaceMosaicLayout={() => {}}
        />,
      );
      expect(wrapper.instance().determineWorkspaceLayout()).toMatchObject({
        direction: 'row', first: '1', second: '2',
      });
    });
    it('when window ids match workspace layout', () => {
      wrapper = shallow(
        <Workspace
          windows={{ foo: { id: 'foo' } }}
          workspace={{ layout: 'foo' }}
          updateWorkspaceMosaicLayout={() => {}}
        />,
      );
      expect(wrapper.instance().determineWorkspaceLayout()).toBeNull();
    });
  });
  describe('tileRenderer', () => {
    it('when window is available', () => {
      expect(wrapper.instance().tileRenderer('1')).not.toBeNull();
    });
    it('when window is not available', () => {
      expect(wrapper.instance().tileRenderer('bar')).toBeNull();
    });
  });
  describe('mosaicChange', () => {
    it('calls the provided prop to update layout', () => {
      const mock = jest.fn();
      wrapper = shallow(
        <Workspace
          windows={{ foo: { id: 'foo' } }}
          workspace={{ layout: 'foo' }}
          updateWorkspaceMosaicLayout={mock}
        />,
      );
      wrapper.instance().mosaicChange();
      expect(mock).toBeCalled();
    });
  });
});
