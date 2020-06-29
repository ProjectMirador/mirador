import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getAuth, getConfig } from '../state/selectors';
import { AuthenticationSender } from '../components/AuthenticationSender';

/**
 * mapStateToProps - to hook up connect
 * @memberof App
 * @private
 */
const mapStateToProps = (state) => ({
  center: getConfig(state).window.authNewWindowCenter,
  url: (Object.values(getAuth(state)).find(e => e.isFetching && e.profile !== 'http://iiif.io/api/auth/1/external') || {}).id,
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof App
 * @private
 */
const mapDispatchToProps = {
  handleInteraction: actions.resolveAuthenticationRequest,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('AuthenticationSender'),
);

export default enhance(AuthenticationSender);
