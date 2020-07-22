import React from 'react';
import { shallow } from 'enzyme';
import MinimalWindow from '../../../src/containers/MinimalWindow';
import { MosaicRenderPreview } from '../../../src/components/MosaicRenderPreview';

describe('MosaicRenderPreview', () => {
  it('it renders the given title prop passed through the t prop function', () => {
    const wrapper = shallow(
      <MosaicRenderPreview
        t={(k, args) => `${k} ${args.title}`}
        title="The Title Prop"
        windowId="abc123"
      />,
    );

    expect(wrapper.find(MinimalWindow).length).toBe(1);
    expect(
      wrapper.find(MinimalWindow).prop('label'),
    ).toEqual('previewWindowTitle The Title Prop');
    expect(wrapper.find(MinimalWindow).prop('ariaLabel')).toEqual(false);
  });
});
