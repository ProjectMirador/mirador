import React from 'react';
import { shallow } from 'enzyme';

import Typography from '@material-ui/core/Typography';

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
    expect(wrapper.find(Typography).length).toBe(1);
  });

  it('passes correct props to <Typography/>', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(Typography).first().render().text()).toBe('awesome manifest');
  });

  it('title is configurable', () => {
    expect(createWrapper({ hideWindowTitle: true }).find(Typography).length).toEqual(0);
    expect(createWrapper({ hideWindowTitle: true }).find('div').length).toEqual(1);
  });
});
