import { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import DOMPurify from 'dompurify';
import ns from '../config/css-ns';
import htmlRules from '../lib/htmlRules';

const StyledSpan = styled('span')({
});
/**
*/
export class SanitizedHtml extends Component {
  /**
  */
  render() {
    const {
      htmlString, ruleSet, ...props
    } = this.props;

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
      <StyledSpan
        sx={{
          '& a': {
            color: 'primary.main',
            textDecoration: 'underline',
          },
        }}
        className={[ns('third-party-html')].join(' ')}
        dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
          __html: DOMPurify.sanitize(htmlString, htmlRules[ruleSet]),
        }}
        {...props}
      />
    );
  }
}

SanitizedHtml.propTypes = {
  htmlString: PropTypes.string.isRequired,
  ruleSet: PropTypes.string.isRequired,
};
