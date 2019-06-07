import React from 'react';
import { shallow } from 'enzyme';
import { SanitizedHtml } from '../../../src/components/SanitizedHtml';

const wrapper = shallow(
  <SanitizedHtml
    classes={{ root: 'root' }}
    htmlString="<script>doBadThings()</script><b>Don't worry!</b><a>Some link</a>"
    ruleSet="iiif"
  />,
);

describe('SanitizedHtml', () => {
  it('should render needed elements', () => {
    expect(wrapper.find('span').length).toBe(1);
  });

  it('should pass correct class name to root element', () => {
    expect(wrapper.find('span').first().props().className).toBe('root mirador-third-party-html');
  });

  it('should pass sanitized html string to dangerouslySetInnerHTML attribute', () => {
    expect(wrapper.find('span').first().props().dangerouslySetInnerHTML)
      .toEqual({ __html: "<b>Don't worry!</b><a target=\"_blank\" rel=\"noopener noreferrer\">Some link</a>" });
  });
});
