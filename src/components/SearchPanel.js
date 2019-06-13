import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import CompanionWindow from '../containers/CompanionWindow';
import SearchPanelControls from '../containers/SearchPanelControls';
import SearchResults from '../containers/SearchResults';

/** */
export class SearchPanel extends Component {
  /** */
  render() {
    const {
      classes,
      windowId,
      id,
      query,
      removeSearch,
      t,
    } = this.props;

    return (
      <CompanionWindow
        title={(
          <>
            {t('searchTitle')}
            {
              query && query !== '' && (
                <Chip
                  className={classes.clearChip}
                  color="secondary"
                  label={t('clearSearch')}
                  onClick={removeSearch}
                  onDelete={removeSearch}
                  size="small"
                  variant="outlined"
                />
              )
            }
          </>
        )}
        windowId={windowId}
        id={id}
        titleControls={<SearchPanelControls companionWindowId={id} windowId={windowId} />}
      >
        <SearchResults
          companionWindowId={id}
          windowId={windowId}
        />
      </CompanionWindow>
    );
  }
}

SearchPanel.propTypes = {
  classes: PropTypes.shape({
    clearChip: PropTypes.string,
  }),
  id: PropTypes.string.isRequired,
  query: PropTypes.string,
  removeSearch: PropTypes.func.isRequired,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

SearchPanel.defaultProps = {
  classes: {},
  query: '',
  t: key => key,
};
