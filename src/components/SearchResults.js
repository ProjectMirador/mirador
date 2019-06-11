import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SanitizedHtml from '../containers/SanitizedHtml';

/** */
export class SearchResults extends Component {
  /** */
  render() {
    const {
      cwId,
      searchHits,
    } = this.props;

    return (
      <>
        <List>
          {
            searchHits.map(hit => (
              <ListItem
                button
                key={`${cwId}-${hit.annotations[0]}`}
                component="li"
              >
                <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                  <SanitizedHtml ruleSet="iiif" htmlString={hit.before} />
                  {' '}
                  <strong>
                    <SanitizedHtml ruleSet="iiif" htmlString={hit.match} />
                  </strong>
                  {' '}
                  <SanitizedHtml ruleSet="iiif" htmlString={hit.after} />
                </ListItemText>
              </ListItem>
            ))
          }
        </List>
      </>
    );
  }
}

SearchResults.propTypes = {
  cwId: PropTypes.string.isRequired,
  searchHits: PropTypes.arrayOf(PropTypes.object).isRequired,
  windowId: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
};
