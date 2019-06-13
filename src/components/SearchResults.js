import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SanitizedHtml from '../containers/SanitizedHtml';

/** */
export class SearchResults extends Component {
  /** */
  constructor(props) {
    super(props);

    this.renderHit = this.renderHit.bind(this);
  }

  /** */
  renderHit(hit) {
    const {
      companionWindowId,
      selectContentSearchAnnotation,
      selectedContentSearchAnnotation,
      windowId,
    } = this.props;

    return (
      <ListItem
        button
        key={`${companionWindowId}-${hit.annotations[0]}`}
        component="li"
        onClick={() => selectContentSearchAnnotation(windowId, hit.annotations)}
        selected={selectedContentSearchAnnotation[0] === hit.annotations[0]}
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
    );
  }

  /** */
  render() {
    const {
      searchHits,
    } = this.props;

    return (
      <>
        <List>
          {
            searchHits.map(this.renderHit)
          }
        </List>
      </>
    );
  }
}

SearchResults.propTypes = {
  companionWindowId: PropTypes.string.isRequired,
  searchHits: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectContentSearchAnnotation: PropTypes.func,
  selectedContentSearchAnnotation: PropTypes.arrayOf(PropTypes.string),
  windowId: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
};

SearchResults.defaultProps = {
  selectContentSearchAnnotation: () => {},
  selectedContentSearchAnnotation: [],
};
