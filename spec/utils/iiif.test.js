describe('Iiif', function () {
  xit('getImageUrl', function () {
  });
  
  it('getVersionFromContext', function () {
    var context = 'http://iiif.io/api/image/2/context.json';
    expect(Mirador.Iiif.getVersionFromContext(context)).toEqual('2.0');
    
    context = 'http://iiif.io/api/image/1/context.json';
    expect(Mirador.Iiif.getVersionFromContext(context)).toEqual('1.1');
  });
  
  xit('makeUriWithWidth', function () {
  });
  xit('getImageHostUrl', function () {
  });
});
