import { JSONLDResource } from 'manifesto.js';
import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';

describe('probeResponse actions', () => {
  describe('requestProbeResponse', () => {
    it('requests a probeResponse from given a url', () => {
      const id = 'abc123';
      const expectedAction = {
        probeId: id,
        type: ActionTypes.REQUEST_PROBE_RESPONSE,
      };
      expect(actions.requestProbeResponse(id)).toEqual(expectedAction);
    });
  });
  describe('receiveProbeResponse', () => {
    it('receives a probeResponse', () => {
      const id = 'abc123';
      const json = {
        content: 'probe service request',
        id,
      };
      const expectedAction = {
        probeId: id,
        probeJson: json,
        type: ActionTypes.RECEIVE_PROBE_RESPONSE,
      };
      expect(actions.receiveProbeResponse(id, json)).toEqual(expectedAction);
    });
  });
  describe('fetchProbeResponse', () => {
    describe('success response', () => {
      it('dispatches the REQUEST_PROBE_RESPONSE action', () => {
        const resource = new JSONLDResource({ services: [{ id: 'someUrl', type: 'AuthProbeService2' }] });
        expect(actions.fetchProbeResponse({ resource })).toEqual({
          probeId: 'someUrl',
          resource,
          type: 'mirador/REQUEST_PROBE_RESPONSE',
        });
      });
    });
  });
  describe('removeProbeResponse', () => {
    it('removes an existing probeResponse', () => {
      const expectedAction = {
        probeId: 'foo',
        type: ActionTypes.REMOVE_PROBE_RESPONSE,
      };
      expect(actions.removeProbeResponse('foo')).toEqual(expectedAction);
    });
  });
});
