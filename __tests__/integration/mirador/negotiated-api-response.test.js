const supertest = require('supertest');

describe('GET Negotiated API Response', () => {
  let request;
  beforeAll(() => {
    request = supertest('http://localhost:5000');
  });
  it('responds with API v3 json', () => request
    .get('/api/001')
    .set('Accept', 'application/ld+json;profile="http://iiif.io/api/presentation/3/context.json"')
    .expect(200)
    .then((res) => {
      expect(res.text).toMatch(/http:\/\/iiif\.io\/api\/presentation\/3\/context\.json/);
    }));
  it('responds with API v2 json', () => request
    .get('/api/001')
    .expect(200)
    .then((res) => {
      expect(res.text).toMatch(/http:\/\/iiif\.io\/api\/presentation\/2\/context\.json/);
    }));
});
