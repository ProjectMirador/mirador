import React from 'react';
import { shallow } from 'enzyme';
import WindowIcon from '../../../src/components/WindowIcon';

describe('WindowIcon', () => {
  let wrapper;
  let manifestation;

  describe('without a manifestation', () => {
    beforeEach(() => {
      wrapper = shallow(<WindowIcon />).dive();
    });

    it('renders without an error', () => {
      expect(wrapper.find('img').length).toBe(0);
    });
  });


  describe('with a manifestation without a logo', () => {
    beforeEach(() => {
      manifestation = { getLogo: () => null };
      wrapper = shallow(<WindowIcon manifestation={manifestation} />).dive();
    });

    it('renders without an error', () => {
      expect(wrapper.find('img').length).toBe(0);
    });
  });

  describe('with a manifestation with a logo', () => {
    beforeEach(() => {
      manifestation = { getLogo: () => 'http://example.com/thumbnail.jpg' };
      wrapper = shallow(<WindowIcon manifestation={manifestation} classes={{ logo: 'logo-class' }} />).dive();
    });

    it('renders without an error', () => {
      expect(wrapper.find('img.logo-class[src="http://example.com/thumbnail.jpg"]').length).toBe(1);
    });
  });
});
