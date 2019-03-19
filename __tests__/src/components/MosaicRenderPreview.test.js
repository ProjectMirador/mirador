import React from 'react';
import { shallow } from 'enzyme';
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

    expect(wrapper.find('.mosaic-window-body').length).toBe(1);
    expect(
      wrapper.find('.mosaic-window-body').children().text(),
    ).toEqual('previewWindowTitle The Title Prop');
  });
});
