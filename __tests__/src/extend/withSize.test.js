import { forwardRef } from 'react';
import { render, screen } from '@testing-library/react';
import PropTypes from 'prop-types';
import { withSize } from '../../../src/extend/withSize';

/** Mock ResizeObserver */
class ResizeObserver {
  /** */
  constructor(callback) {
    this.callback = callback;
  }

  /** */
  observe(element) {
    // Fake a resize event
    setTimeout(() => {
      this.callback([{ contentRect: { height: 300, width: 400 } }]);
    }, 0);
  }

  /** */
  disconnect() { jest.fn(); } // eslint-disable-line
}

// Replace the global ResizeObserver with the mock
global.ResizeObserver = ResizeObserver;

/** */
const TestComponent = forwardRef(({ size }, ref) => (
  <div ref={ref}>
    {size.width}
    {size.height}
  </div>
));

TestComponent.propTypes = {
  size: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
};

const WrappedTestComponent = withSize()(TestComponent);

test('it should render with size', async () => {
  render(<WrappedTestComponent />);

  // Assert that the updated size is reflected
  expect(await screen.findByText(/400/)).toBeInTheDocument();
  expect(await screen.findByText(/300/)).toBeInTheDocument();
});
