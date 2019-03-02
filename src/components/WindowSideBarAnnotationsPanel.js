import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { SanitizedHtml } from './SanitizedHtml';

/**
 * WindowSideBarAnnotationsPanel ~
*/
export class WindowSideBarAnnotationsPanel extends Component {
  /**
   * Rreturn an array of sanitized annotation data
   */
  sanitizedAnnotations() {
    const { annotations } = this.props;

    return (
      <List>
        {
          annotations.map(annotation => (
            <ListItem key={annotation.id}>
              <Typography variant="body2">
                <SanitizedHtml ruleSet="iiif" htmlString={annotation.content} />
              </Typography>
            </ListItem>
          ))
        }
      </List>
    );
  }

  /**
   * Returns the rendered component
  */
  render() {
    const { annotations, classes, t } = this.props;
    return (
      <>
        <Typography className={classes.windowSideBarH2} variant="h2">{t('annotations')}</Typography>
        <Typography variant="body2">{t('showingNumAnnotations', { number: annotations.length })}</Typography>
        {this.sanitizedAnnotations()}
      </>
    );
  }
}

WindowSideBarAnnotationsPanel.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })),
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types,
  t: PropTypes.func,
};

WindowSideBarAnnotationsPanel.defaultProps = {
  annotations: [],
  classes: {},
  t: key => key,
};
