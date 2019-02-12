import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import createStore from '../../../src/state/createStore';
import * as actions from '../../../src/state/actions';
import WindowSideBarCanvasPanel from '../../../src/components/WindowSideBarCanvasPanel';
import fixture from '../../fixtures/version-2/001.json';

describe('WindowSideBarCanvasPanel', () => {
  let wrapper;
  let manifest;
  let canvases;
  const store = createStore();

  beforeEach(() => {
    store.dispatch(actions.receiveManifest('foo', fixture));
    manifest = store.getState().manifests.foo;
    /* inject canvases directly via property */
    canvases = manifest.manifestation.getSequences()[0].getCanvases();
    wrapper = shallow(
      <WindowSideBarCanvasPanel manifest={manifest} canvases={canvases} />,
    ).dive();
  });

  it('renders without an error', () => {
    expect(
      wrapper.find('WithStyles(ListItem)').length,
    ).toBe(canvases.length);

    expect(
      wrapper.find('WithStyles(ListItem) WithStyles(Typography)[variant="body2"]').first().matchesElement(
        <Typography>{canvases[0].__jsonld.label}</Typography>, // eslint-disable-line no-underscore-dangle, max-len
      ),
    ).toBe(true);
  });
});
