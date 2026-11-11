import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import { Branding } from '../src/components/Branding';

test('renders', async () => {
  const { getByRole } = await render(<Branding />);

  await expect.element(getByRole('link')).toHaveAttribute('href', 'https://projectmirador.org');
});
