import React from 'react';
import { shallow } from 'enzyme';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Skeleton from '@material-ui/lab/Skeleton';
import { Utils } from 'manifesto.js/dist-esmodule/Utils';
import { CollectionDialog } from '../../../src/components/CollectionDialog';
import collection from '../../fixtures/version-2/collection.json';

/** */
function createWrapper(props) {
  const manifest = Utils.parseManifest(props.manifest ? props.manifest : collection);
  return shallow(
    <CollectionDialog
      addWindow={() => {}}
      classes={{}}
      ready
      manifest={manifest}
      t={(key) => key}
      {...props}
    />,
  );
}

describe('CollectionDialog', () => {
  it('renders a dialog with collection menu items', () => {
    const wrapper = createWrapper({});
    expect(wrapper.find(Dialog).length).toEqual(1);
    expect(wrapper.find(MenuItem).length).toEqual(55);
    expect(wrapper.find(MenuItem).first().text()).toEqual('Test 1 Manifest: Minimum Required Fields');
  });
  it('when not ready returns placeholder skeleton', () => {
    const wrapper = createWrapper({ ready: false });
    expect(wrapper.find(Skeleton).length).toEqual(3);
  });
  it('clicking the hide button fires hideCollectionDialog', () => {
    const hideCollectionDialog = jest.fn();
    const wrapper = createWrapper({ hideCollectionDialog });
    expect(wrapper.find(DialogActions).find(Button).first().simulate('click'));
    expect(hideCollectionDialog).toHaveBeenCalled();
  });
});
