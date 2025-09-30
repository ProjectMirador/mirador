import { Service } from 'manifesto.js';
import { getIiifResourceImageService } from '../../../src/lib/iiif';

describe('IIIF utils', () => {
  it('extracts the IIIF image service from the resource', () => {
    const subject = {
      getServices: () => [
        new Service({ id: 'some-service', type: 'SearchService1' }),
        new Service({ id: 'image-service', type: 'ImageService2' }),
      ],
    };
    const service = getIiifResourceImageService(subject);

    expect(service.id).toEqual('image-service');
  });
});
