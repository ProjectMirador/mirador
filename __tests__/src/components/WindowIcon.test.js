import React from 'react';
import { shallow } from 'enzyme';
import WindowIcon from '../../../src/components/WindowIcon';

/** createWrapper */
function createWrapper(props) {
  return shallow(
    <WindowIcon
      manifestLogo=""
      classses={{}}
      {...props}
    />,
  ).dive(); // to unwrap HOC created by withStyles();
}

describe('WindowIcon', () => {
  it('should render nothing if no manifest logo given', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('img').length).toBe(0);
  });

  it('should render logo if manifest logo is given', () => {
    const manifestLogo = 'http://foo.bar';
    const wrapper = createWrapper({ manifestLogo });
    expect(wrapper.find('img').first().prop('src'))
      .toEqual(manifestLogo);
  });
});
