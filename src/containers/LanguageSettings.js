import { connect } from 'react-redux';
import * as actions from '../state/actions';
import { getLanguagesFromConfigWithCurrent } from '../state/selectors';
import { LanguageSettings } from '../components/LanguageSettings';

/**
 * Map state to props for connect
 */
const mapStateToProps = state => ({
  languages: getLanguagesFromConfigWithCurrent(state),
});

/**
 * Map action dispatches to props for connect
 */
const mapDispatchToProps = (dispatch, { afterSelect }) => ({
  handleClick: (language) => {
    dispatch(actions.updateConfig({ language }));

    afterSelect && afterSelect();
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSettings);
