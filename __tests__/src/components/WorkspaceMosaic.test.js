import React from 'react';
import { shallow } from 'enzyme';
import { Mosaic } from 'react-mosaic-component';
import WorkspaceMosaic from '../../../src/components/WorkspaceMosaic';

describe('WorkspaceMosaic', () => {
  const windows = { w1: { id: 'w1' }, w2: { id: 'w2' } };
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <WorkspaceMosaic
        windows={windows}
        workspace={{}}
        updateWorkspaceMosaicLayout={() => {}}
      />,
    );
  });
  it('should render properly with an initialValue', () => {
    expect(wrapper.matchesElement(
      <Mosaic initialValue={{ direction: 'row', first: 'w1', second: 'w2' }} />,
    )).toBe(true);
  });
  describe('determineWorkspaceLayout', () => {
    it('when window ids do not match workspace layout', () => {
      wrapper = shallow(
        <WorkspaceMosaic
          windows={windows}
          workspace={{ layout: 'foo' }}
          updateWorkspaceMosaicLayout={() => {}}
        />,
      );
      expect(wrapper.instance().determineWorkspaceLayout()).toMatchObject({
        direction: 'row', first: 'w1', second: 'w2',
      });
    });
    it('when window ids match workspace layout', () => {
      wrapper = shallow(
        <WorkspaceMosaic
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
      expect(wrapper.instance().tileRenderer('w1')).not.toBeNull();
    });
    it('when window is not available', () => {
      expect(wrapper.instance().tileRenderer('bar')).toBeNull();
    });
  });
  describe('mosaicChange', () => {
    it('calls the provided prop to update layout', () => {
      const mock = jest.fn();
      wrapper = shallow(
        <WorkspaceMosaic
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
