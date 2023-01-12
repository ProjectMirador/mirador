import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import { CollectionInfo } from '../../../src/components/CollectionInfo';
import CollapsibleSection from '../../../src/containers/CollapsibleSection';

/** */
function createWrapper(props) {
  return shallow(
    <CollectionInfo
      id="test"
      collectionPath={[1, 2]}
      showCollectionDialog={() => {}}
      {...props}
    />,
  );
}

describe('CollectionInfo', () => {
  it('renders a collapsible section', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(CollapsibleSection).length).toEqual(1);
  });
  it('without a collectionPath, renders nothing', () => {
    const wrapper = createWrapper({ collectionPath: [] });
    expect(wrapper.find(CollapsibleSection).length).toEqual(0);
  });
  it('clicking the button fires showCollectionDialog', () => {
    const showCollectionDialog = jest.fn();
    const wrapper = createWrapper({ showCollectionDialog });
    expect(wrapper.find(Button).first().simulate('click'));
    expect(showCollectionDialog).toHaveBeenCalled();
  });
});
