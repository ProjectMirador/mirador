import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import ns from '../config/css-ns';
import htmlRules from '../lib/htmlRules';

/**
*/
export class SanitizedHtml extends Component {
  /**
  */
  render() {
    const { classes, htmlString, ruleSet } = this.props;

    // Add a hook to make all links open a new window
    DOMPurify.addHook('afterSanitizeAttributes', (node) => {
      // set all elements owning target to target=_blank
      if ('target' in node) {
        node.setAttribute('target', '_blank');
        // prevent https://www.owasp.org/index.php/Reverse_Tabnabbing
        node.setAttribute('rel', 'noopener noreferrer');
      }
    });

    return (
      <span
        className={[classes.root, ns('third-party-html')].join(' ')}
        dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
          __html: DOMPurify.sanitize(htmlString, htmlRules[ruleSet]),
        }}
      />
    );
  }
}

SanitizedHtml.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  htmlString: PropTypes.string.isRequired,
  ruleSet: PropTypes.string.isRequired,
};

SanitizedHtml.defaultProps = {
  classes: {},
};
