import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import { SidebarIndexItem } from '../../../src/components/SidebarIndexItem';

/** */
function createWrapper(props) {
  return shallow(
    <SidebarIndexItem
      label="yolo"
      classes={{}}
      {...props}
    />,
  );
}

describe('SidebarIndexItem', () => {
  it('creates Typography with a canvas label', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(Typography).length).toBe(1);
    expect(wrapper.text()).toBe('yolo');
  });
});
