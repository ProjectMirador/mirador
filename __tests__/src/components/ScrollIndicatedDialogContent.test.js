import React from 'react';
import { shallow } from 'enzyme';
import DialogContent from '@material-ui/core/DialogContent';
import { ScrollIndicatedDialogContent } from '../../../src/components/ScrollIndicatedDialogContent';

/** Utility function to wrap  */
function createWrapper(props) {
  return shallow(
    <ScrollIndicatedDialogContent
      classes={{ shadowScrollDialog: 'shadowScrollDialog' }}
      {...props}
    />,
  );
}

describe('ScrollIndicatedDialogContent', () => {
  let wrapper;

  it('renders a DialogContnet component passing props', () => {
    wrapper = createWrapper({ randomProp: 'randomPropValue' });

    expect(wrapper.find(DialogContent).length).toBe(1);
    expect(wrapper.find(DialogContent).props().randomProp).toEqual('randomPropValue');
  });

  it('provides a className to the DialogContent prop to style it', () => {
    wrapper = createWrapper();

    expect(wrapper.find(DialogContent).props().className).toMatch('shadowScrollDialog');
  });

  it('joins an incoming className prop with our className', () => {
    wrapper = createWrapper({ className: 'upstreamClassName' });

    expect(wrapper.find(DialogContent).props().className).toMatch('upstreamClassName shadowScrollDialog');
  });
});
