import React from 'react';
import { shallow } from 'enzyme';
import SvgDotsImage from '../../../src/components/SvgDots';

describe('SvgDots', () => {
  it('should render properly', () => {
    const defaultFillColor = SvgDotsImage.defaultProps.color;
    const wrapper = shallow(<SvgDotsImage />);

    expect(defaultFillColor).not.toBe(undefined);
    expect(wrapper.matchesElement(
      <svg>
        <g fill={defaultFillColor}>
          <circle />
          <circle />
          <circle />
        </g>
      </svg>,
    )).toBe(true);
  });

  it('should pass color property and render properly', () => {
    const fillColor = '#F00';
    const wrapper = shallow(<SvgDotsImage color={fillColor} />);

    expect(wrapper.matchesElement(
      <svg>
        <g fill={fillColor}>
          <circle />
          <circle />
          <circle />
        </g>
      </svg>,
    )).toBe(true);
  });
});
