import { render, screen } from 'test-utils';

import { MosaicRenderPreview } from '../../../src/components/MosaicRenderPreview';

describe('MosaicRenderPreview', () => {
  it('it renders the given title prop passed through the t prop function', () => {
    render(
      <MosaicRenderPreview
        t={(k, args) => `${k} ${args.title}`}
        title="The Title Prop"
        windowId="abc123"
      />,
    );

    expect(screen.getByRole('heading')).toHaveTextContent('previewWindowTitle The Title Prop');
  });
});
