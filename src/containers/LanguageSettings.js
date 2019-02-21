import { connect } from 'react-redux';
import * as actions from '../state/actions';
import LanguageSettings from '../components/LanguageSettings';

/**
 * Map state to props for connect
 */
const mapStateToProps = state => ({
  languages: state.config.availableLanguages,
  currentLanguage: state.config.language,
  active: language => language === state.config.language,
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
