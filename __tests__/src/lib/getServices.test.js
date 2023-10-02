import { v4 as uuid } from 'uuid';
import {
  anyAuthServices, getLogoutService, getProbeService, getTokenService,
} from '../../../src/lib/getServices';

/**
 */
function resourceFixtureWithService(props) {
  return {
    id: uuid(),
    services: [
      { ...props },
    ],
    type: 'Dataset',
  };
}

/**
 */
function actualLogoutServiceId(resource) {
  const service = getLogoutService(resource);
  return service
  && service.id;
}

/**
 */
function actualTokenServiceId(resource) {
  const service = getTokenService(resource);
  return service
  && service.id;
}

/**
 */
function actualProbeServiceId(resource) {
  const service = getProbeService(resource);
  return service
  && service.id;
}

describe('anyAuthServices', () => {
  it('returns a filtered list', () => {
    const serviceId = uuid();
    const auth0 = resourceFixtureWithService({ id: serviceId, profile: 'http://iiif.io/api/auth/0/anyService' });
    expect(anyAuthServices(auth0).length).toEqual(1);
    const auth1 = resourceFixtureWithService({ id: serviceId, profile: 'http://iiif.io/api/auth/1/anyService' });
    expect(anyAuthServices(auth1).length).toEqual(1);
    const auth2 = resourceFixtureWithService({ id: serviceId, type: 'AuthAnyService2' });
    expect(anyAuthServices(auth2).length).toEqual(1);
    const notAuthProfile = resourceFixtureWithService({ id: serviceId, profile: 'http://iiif.io/api/not-auth/1/anyService' });
    expect(anyAuthServices(notAuthProfile).length).toEqual(0);
    const notAuthType = resourceFixtureWithService({ id: serviceId, type: 'NotAuthAnyService2' });
    expect(anyAuthServices(notAuthType).length).toEqual(0);
  });
});

describe('getLogoutService', () => {
  it('returns a Service', () => {
    const serviceId = uuid();
    const auth0 = resourceFixtureWithService({ id: serviceId, profile: 'http://iiif.io/api/auth/0/logout' });
    expect(actualLogoutServiceId(auth0)).toEqual(serviceId);
    const auth1 = resourceFixtureWithService({ id: serviceId, profile: 'http://iiif.io/api/auth/1/logout' });
    expect(actualLogoutServiceId(auth1)).toEqual(serviceId);
    const auth2 = resourceFixtureWithService({ id: serviceId, type: 'AuthLogoutService2' });
    expect(actualLogoutServiceId(auth2)).toEqual(serviceId);
  });
});

describe('getProbeService', () => {
  it('returns a Service', () => {
    const serviceId = uuid();
    const auth1 = resourceFixtureWithService({ id: serviceId, profile: 'http://iiif.io/api/auth/1/probe' });
    expect(actualProbeServiceId(auth1)).toEqual(serviceId);
    const auth2 = resourceFixtureWithService({ id: serviceId, type: 'AuthProbeService2' });
    expect(actualProbeServiceId(auth2)).toEqual(serviceId);
  });
});

describe('getTokenService', () => {
  it('returns a Service', () => {
    const serviceId = uuid();
    const auth0 = resourceFixtureWithService({ id: serviceId, profile: 'http://iiif.io/api/auth/0/token' });
    expect(actualTokenServiceId(auth0)).toEqual(serviceId);
    const auth1 = resourceFixtureWithService({ id: serviceId, profile: 'http://iiif.io/api/auth/1/token' });
    expect(actualTokenServiceId(auth1)).toEqual(serviceId);
    const auth2 = resourceFixtureWithService({ id: serviceId, type: 'AuthAccessTokenService2' });
    expect(actualTokenServiceId(auth2)).toEqual(serviceId);
  });
});
