import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MiradorIcon from '../../../src/components/icons/MiradorIcon';
import { Branding } from '../../../src/components/Branding';

describe('Branding', () => {
  let wrapper;

  it('renders', () => {
    wrapper = shallow(<Branding />);

    expect(
      wrapper.matchesElement(
        <div>
          <Typography>
            <IconButton>
              <MiradorIcon />
            </IconButton>
          </Typography>
        </div>,
      ),
    ).toBe(true);
  });

  it('renders additional items for the wide variant', () => {
    wrapper = shallow(<Branding variant="wide" />);

    expect(
      wrapper.matchesElement(
        <div>
          <div>
            <Typography>mirador</Typography>
            <Typography>version</Typography>
          </div>
          <Typography>
            <IconButton>
              <MiradorIcon />
            </IconButton>
          </Typography>
        </div>,
      ),
    ).toBe(true);
  });
});
