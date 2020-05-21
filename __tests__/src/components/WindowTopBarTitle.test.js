import React from 'react';
import { shallow } from 'enzyme';
import Skeleton from '@material-ui/lab/Skeleton';

import { WindowTopBarTitle } from '../../../src/components/WindowTopBarTitle';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WindowTopBarTitle
      manifestTitle="awesome manifest"
      windowId="xyz"
      classes={{}}
      {...props}
    />,
  );
}

describe('WindowTopBarTitle', () => {
  it('renders all needed elements', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('TitleTypography').length).toBe(1);
  });

  it('passes correct props to <Typography/>', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('TitleTypography').first().render().text()).toBe('awesome manifest');
  });

  it('renders a Skeleton when loading', () => {
    const wrapper = createWrapper({ isFetching: true });
    expect(wrapper.find('TitleTypography').dive().find(Skeleton).length).toBe(1);
  });

  it('renders an error', () => {
    const wrapper = createWrapper({ error: 'some error message' });
    expect(wrapper.find('TitleTypography').render().text()).toBe('some error message');
  });

  it('title is configurable', () => {
    expect(createWrapper({ hideWindowTitle: true }).find('TitleTypography').length).toEqual(0);
    expect(createWrapper({ hideWindowTitle: true }).find('div').length).toEqual(1);
  });
});
