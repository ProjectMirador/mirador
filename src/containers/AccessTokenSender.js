import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { AccessTokenSender } from '../components/AccessTokenSender';


/**
 * mapStateToProps - to hook up connect
 * @memberof App
 * @private
 */
const mapStateToProps = ({ accessTokens }) => ({
  url: accessTokens && (Object.values(accessTokens).find(e => e.isFetching) || {}).id,
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof App
 * @private
 */
const mapDispatchToProps = {
  handleAccessTokenMessage: actions.resolveAccessTokenRequest,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('AccessTokenSender'),
);

export default enhance(AccessTokenSender);
