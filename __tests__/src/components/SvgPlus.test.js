import React from 'react';
import { shallow } from 'enzyme';
import SvgPlusImage from '../../../src/components/SvgPlus';

describe('SvgPlus', () => {
  it('should render properly', () => {
    const defaultFillColor = SvgPlusImage.defaultProps.color;
    const wrapper = shallow(<SvgPlusImage />);

    expect(defaultFillColor).not.toBe(undefined);
    expect(wrapper.matchesElement(
      <svg>
        <ellipse fill={defaultFillColor} />
        <path />
      </svg>,
    )).toBe(true);
  });

  it('should pass color property and render properly', () => {
    const fillColor = '#F00';
    const wrapper = shallow(<SvgPlusImage color={fillColor} />);

    expect(wrapper.matchesElement(
      <svg>
        <ellipse fill={fillColor} />
        <path />
      </svg>,
    )).toBe(true);
  });
});
