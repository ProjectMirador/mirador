import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import createStore from '../../../src/state/createStore';
import * as actions from '../../../src/state/actions';
import WindowSideBarInfoPanel from '../../../src/components/WindowSideBarInfoPanel';
import fixture from '../../fixtures/version-2/001.json';

describe('WindowSideBarInfoPanel', () => {
  let wrapper;
  let manifest;
  const store = createStore();

  beforeEach(() => {
    store.dispatch(actions.receiveManifest('foo', fixture));
    manifest = store.getState().manifests.foo;
    wrapper = shallow(
      <WindowSideBarInfoPanel manifest={manifest} />,
    ).dive();
  });

  it('renders without an error', () => {
    expect(
      wrapper.find('WithStyles(Typography)[variant="h2"]').first().matchesElement(
        <Typography>aboutThisItem</Typography>,
      ),
    ).toBe(true);

    expect(
      wrapper.find('WithStyles(Typography)[variant="h3"]').first().matchesElement(
        <Typography>Bodleian Library Human Freaks 2 (33)</Typography>,
      ),
    ).toBe(true);

    expect(
      wrapper.find('WithStyles(Typography)[variant="body2"]').first().matchesElement(
        <Typography>[Handbill of Mr. Becket, [1787] ]</Typography>,
      ),
    ).toBe(true);
  });
});
