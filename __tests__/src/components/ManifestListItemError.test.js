import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import { ManifestListItemError } from '../../../src/components/ManifestListItemError';

/**
 * Helper function to wrap creating a ManifestListItemError component
*/
function createWrapper(props) {
  return shallow(
    <ManifestListItemError
      classes={{}}
      manifestId="http://example.com"
      onDismissClick={() => {}}
      onTryAgainClick={() => {}}
      {...props}
    />,
  );
}

describe('ManifestListItemError', () => {
  let wrapper;
  let mockFn;

  it('renders the failed manifest url and error key', () => {
    wrapper = createWrapper();

    expect(
      wrapper.find(Typography).children().first().text(),
    ).toEqual('manifestError'); // the i18n key

    expect(
      wrapper.find(Typography).children().last().text(),
    ).toEqual('http://example.com');
  });

  it('has a dismiss button that fires the onDismissClick prop', () => {
    mockFn = jest.fn();
    wrapper = createWrapper({ onDismissClick: mockFn });

    wrapper.find('WithStyles(Button)').first().simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('http://example.com');
  });

  it('has a try again button that fires the onTryAgainClick prop', () => {
    mockFn = jest.fn();
    wrapper = createWrapper({ onTryAgainClick: mockFn });

    wrapper.find('WithStyles(Button)').last().simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('http://example.com');
  });
});
