describe('OpenSeadragon', function () {
  var subject;
  
  beforeEach(function() {
    jQuery('body').append('<div id="osd"></div>');
    this.osd = new Mirador.OpenSeadragon({
      id: 'osd',
      toolbarID: 'my-osd-toolbar'
    });
    subject = this.osd;
  });
  
  describe('Construction', function () {
    it('should work with default setup', function() {
      expect(true).toBe(true); //Force beforeEach setup to run
    });
  });
});
