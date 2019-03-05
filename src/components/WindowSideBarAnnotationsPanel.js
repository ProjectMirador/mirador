import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { SanitizedHtml } from './SanitizedHtml';
import CompanionWindow from '../containers/CompanionWindow';
import ns from '../config/css-ns';

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
    const {
      annotations, t, windowId, id,
    } = this.props;
    return (
      <CompanionWindow title={t('annotations')} paperClassName={ns('window-sidebar-annotation-panel')} windowId={windowId} id={id}>
        <Typography variant="body2">{t('showingNumAnnotations', { number: annotations.length })}</Typography>
        {this.sanitizedAnnotations()}
      </CompanionWindow>
    );
  }
}

WindowSideBarAnnotationsPanel.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })),
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

WindowSideBarAnnotationsPanel.defaultProps = {
  annotations: [],
  t: key => key,
};
