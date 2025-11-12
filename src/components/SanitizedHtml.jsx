import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import DOMPurify from 'dompurify';
import ns from '../config/css-ns';
import htmlRules from '../lib/htmlRules';

const Root = styled('span', { name: 'IIIFHtmlContent', slot: 'root' })({});

// Add a hook to make all links open a new window
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  // set all elements owning target to target=_blank
  if ('target' in node) {
    node.setAttribute('target', '_blank');
    // prevent https://www.owasp.org/index.php/Reverse_Tabnabbing
    node.setAttribute('rel', 'noopener noreferrer');
  }
});

/**
*/
export function SanitizedHtml({
  classes = {}, htmlString, ruleSet, ...rest
}) {
  console.log('SanitizedHtml render');
  console.log(ruleSet);

  const stopIfAnchor = (e) => {
    console.log('SanitizedHtml stopIfAnchor');
    const el = e.target instanceof Node ? e.target : null;
    if (el && (el.closest && el.closest('a'))) {
      // allow the browser default (open/focus tab), but don’t notify parents
      e.stopPropagation();
      window.open(el.closest('a').href, '_blank', 'noopener');
    }
  };

  return (
    <Root
      className={[ns('third-party-html'), classes.root].join(' ')}
      dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
        __html: DOMPurify.sanitize(htmlString, htmlRules[ruleSet]),
      }}
      onClickCapture={stopIfAnchor} // left-click, keyboard “Enter/Space”
      onMouseDownCapture={stopIfAnchor} // middle-click open in new tab
      {...rest}
    />
  );
}

SanitizedHtml.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  htmlString: PropTypes.string.isRequired,
  ruleSet: PropTypes.string.isRequired,
};
