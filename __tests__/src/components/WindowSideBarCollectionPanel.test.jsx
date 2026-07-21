import { render, screen } from '@tests/utils/test-utils';
import { Utils } from 'manifesto.js';

import { WindowSideBarCollectionPanel } from '../../../src/components/WindowSideBarCollectionPanel';
import collectionJson from '../../fixtures/version-2/collection.json';

/**
 * Helper function to create a wrapper around WindowSideBarCollectionPanel
 */
function createWrapper(props) {
  const { collection: collectionData, ...otherProps } = props;
  const collection = collectionData ? Utils.parseManifest(collectionData) : null;

  return render(
    <WindowSideBarCollectionPanel
      id="companion-id"
      windowId="window-id"
      manifestId="manifest-id"
      canvasNavigation={{ height: 100, width: 100 }}
      updateCompanionWindow={() => {}}
      updateWindow={() => {}}
      collection={collection}
      {...otherProps}
    />,
    { preloadedState: { companionWindows: { 'companion-id': { content: 'collection' } } } },
  );
}

describe('WindowSideBarCollectionPanel', () => {
  describe('isMultipart - handles undefined/null behaviors without crashing', () => {
    it('does not crash when behaviors is undefined', () => {
      const collectionWithoutBehaviors = { ...collectionJson };
      delete collectionWithoutBehaviors.behavior;

      createWrapper({ collection: collectionWithoutBehaviors });

      expect(screen.getByRole('heading', { name: 'Collection' })).toBeInTheDocument();
    });

    it('does not crash when behaviors is null', () => {
      const collectionWithNullBehaviors = { ...collectionJson, behavior: null };

      createWrapper({ collection: collectionWithNullBehaviors });

      expect(screen.getByRole('heading', { name: 'Collection' })).toBeInTheDocument();
    });
  });
});
