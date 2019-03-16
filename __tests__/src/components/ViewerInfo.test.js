import React from 'react';
import { shallow } from 'enzyme';
import { Typography } from '@material-ui/core';
import { ViewerInfo } from '../../../src/components/ViewerInfo';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <ViewerInfo
      canvasCount={8}
      canvasIndex={2}
      canvasLabel="testLabel"
      t={k => k}
      {...props}
    />,
  );
}

describe('ViewerNavigation', () => {
  let wrapper;

  it('renders the component', () => {
    wrapper = createWrapper();

    expect(wrapper.find(Typography).length).toBe(2);
    expect(wrapper.find(Typography).at(0)
      .matchesElement(<Typography>3 of 8</Typography>)).toBe(true);
    expect(wrapper.find(Typography).at(1)
      .matchesElement(<Typography> • testLabel</Typography>)).toBe(true);
  });
});
