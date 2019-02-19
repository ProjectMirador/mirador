import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sanitize } from 'dompurify';
import ns from '../config/css-ns';
import htmlRules from '../lib/htmlRules';

/**
*/
class SanitizedHtml extends Component {
  /**
  */
  render() {
    const { htmlString, ruleSet } = this.props;
    return (
      <span
        className={ns('third-party-html')}
        dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
          __html: sanitize(htmlString, htmlRules[ruleSet]),
        }}
      />
    );
  }
}

SanitizedHtml.propTypes = {
  ruleSet: PropTypes.string.isRequired,
  htmlString: PropTypes.string.isRequired,
};

export default SanitizedHtml;
