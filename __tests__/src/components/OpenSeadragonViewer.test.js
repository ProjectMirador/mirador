import React from 'react';
import { shallow } from 'enzyme';
import { OpenSeadragonViewer } from '../../../src/components/OpenSeadragonViewer';

describe('OpenSeadragonViewer', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <OpenSeadragonViewer
        tileSources={[{ '@id': 'http://foo' }]}
        window={{ id: 'base' }}
      />,
    );
  });
  it('renders the component', () => {
    expect(wrapper.find('.mirador-osd-container').length).toBe(1);
  });
  describe('tileSourcesMatch', () => {
    it('when they do not match', () => {
      expect(wrapper.instance().tileSourcesMatch([])).toBe(false);
    });
    it('when the @ids do match', () => {
      expect(wrapper.instance().tileSourcesMatch([{ '@id': 'http://foo' }])).toBe(true);
    });
  });
});
