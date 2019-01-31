import React from 'react';
import { shallow } from 'enzyme';
import manifesto from 'manifesto.js';
import WindowViewer from '../../../src/components/WindowViewer';
import OSDViewer from '../../../src/containers/OpenSeadragonViewer';
import ConnectedViewerNavigation from '../../../src/components/ViewerNavigation';
import fixture from '../../fixtures/version-2/024.json';

const mockManifest = {
  id: 123,
  manifestation: manifesto.create(fixture),
};

const mockWindow = {
  canvasIndex: 0,
};

describe('WindowViewer', () => {
  it('renders properly', () => {
    const wrapper = shallow(
      <WindowViewer
        infoResponses={{}}
        fetchInfoResponse={() => {}}
        manifest={mockManifest}
        window={mockWindow}
      />,
    );
    expect(wrapper.matchesElement(
      <>
        <OSDViewer>
          <ConnectedViewerNavigation />
        </OSDViewer>
      </>,
    )).toBe(true);
  });
});
