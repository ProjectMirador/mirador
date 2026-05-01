import { render, screen } from '@tests/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { Utils } from 'manifesto.js';

import { CollectionDialog } from '../../../src/components/CollectionDialog';
import collection from '../../fixtures/version-2/collection.json';
import parentCollection from '../../fixtures/version-2/parentCollection.json';

/** */
function createWrapper(props) {
  const { collection: propsCollection, manifest, ...otherProps } = props;
  const manifestId = (manifest && manifest['@id']) || collection['@id'];
  const manifestObject = Utils.parseManifest(manifest || collection);
  const collectionObject = propsCollection && Utils.parseManifest(propsCollection);

  render(<div id="window" />);

  return render(
    <CollectionDialog
      addWindow={() => {}}
      collection={collectionObject}
      classes={{}}
      ready
      manifestId={manifestId}
      manifest={manifestObject}
      windowId="window"
      {...otherProps}
    />,
    { preloadedState: { windows: { window: { id: 'window' } } } },
  );
}

describe('CollectionDialog', () => {
  it('renders a dialog with collection menu items', () => {
    createWrapper({});

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getAllByRole('menuitem')).toHaveLength(55);
    expect(screen.getByRole('menuitem', { name: 'Test 1 Manifest: Minimum Required Fields' })).toBeInTheDocument();
  });

  it('when not ready returns placeholder skeleton', () => {
    createWrapper({ ready: false });

    expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();

    expect(screen.getByRole('dialog').querySelectorAll('.MuiSkeleton-root')).toHaveLength(3); // eslint-disable-line testing-library/no-node-access
  });

  it('clicking the hide button fires hideCollectionDialog', async () => {
    const user = userEvent.setup();
    const hideCollectionDialog = vi.fn();
    createWrapper({ hideCollectionDialog });

    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(hideCollectionDialog).toHaveBeenCalled();
  });

  it('fires correct showCollectionDialog when a child collection is selected', async () => {
    const user = userEvent.setup();
    const showCollectionDialog = vi.fn();

    createWrapper({ manifest: parentCollection, showCollectionDialog });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getAllByRole('menuitem')).toHaveLength(1);
    expect(screen.getByRole('menuitem', { name: 'Collection of Test Cases - label for parent' })).toBeInTheDocument();

    await user.click(screen.getByRole('menuitem', { name: 'Collection of Test Cases - label for parent' }));
    expect(showCollectionDialog).toHaveBeenCalledWith(collection['@id'], [parentCollection['@id']], 'window');
  });

  it('fires correct showCollectionDialog when the parent collection is clicked', async () => {
    const user = userEvent.setup();
    const showCollectionDialog = vi.fn();

    createWrapper({
      collection: parentCollection,
      dialogCollectionPath: [parentCollection['@id']],
      manifest: collection,
      showCollectionDialog,
    });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Parent Collection of Collection' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Parent Collection of Collection' }));
    expect(showCollectionDialog).toHaveBeenCalledWith(parentCollection['@id'], [], 'window');
  });

  it('fires hideCollectionDialog, setWorkspaceAddVisibility, updateWindow when a manifest is selected', async () => {
    const user = userEvent.setup();
    const hideCollectionDialog = vi.fn();
    const setWorkspaceAddVisibility = vi.fn();
    const updateWindow = vi.fn();
    const manifestId = 'http://iiif.io/api/presentation/2.1/example/fixtures/1/manifest.json';

    createWrapper({
      collection: parentCollection,
      dialogCollectionPath: [parentCollection['@id']],
      hideCollectionDialog,
      manifest: collection,
      setWorkspaceAddVisibility,
      updateWindow,
    });

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByRole('menuitem', { name: 'Test 1 Manifest: Minimum Required Fields' }));
    expect(hideCollectionDialog).toHaveBeenCalledWith('window');
    expect(setWorkspaceAddVisibility).toHaveBeenCalledWith(false);
    expect(updateWindow).toHaveBeenCalledWith('window', {
      canvasId: null, collectionPath: [parentCollection['@id'], collection['@id']], manifestId,
    });
  });
});
